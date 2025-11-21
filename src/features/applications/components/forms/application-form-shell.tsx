import { AddCompanyButton } from '@/features/companies/components/add-company-button';
import { selectLastCreatedCompanyId } from '@/features/companies/store/companies-ui.selectors';
import { resetLastCreatedCompanyId } from '@/features/companies/store/companies-ui.slice';
import { buildEnumOptions } from '@/shared/forms/build-enum-options';
import { Form } from '@/shared/ui/form/form';
import { FormField, StateWithFormError } from '@/shared/ui/form/form-field';
import { FormSelectField } from '@/shared/ui/form/form-select-field';
import { FormTextareaField } from '@/shared/ui/form/form-textarea-field';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  ApplicationSeniority,
  ApplicationSource,
  ApplicationStatus,
  Company,
  Currency,
  EmploymentType,
  type Application,
} from '@prisma/client';
import React from 'react';
import { ApplicationFormField } from '../../schemas/application.schema';

type Mode = 'create' | 'edit';

type ApplicationFormShellProps = {
  mode: Mode;
  companies: Company[];
  formId: string;
  state: StateWithFormError<ApplicationFormField>;
  pending: boolean;
  initial: Partial<Application>;
  onCancel: () => void;
  submitLabel: string;
  action: (formData: FormData) => void;
};

export function ApplicationFormShell({
  mode,
  companies,
  formId,
  state,
  pending,
  initial,
  onCancel,
  submitLabel,
  action,
}: ApplicationFormShellProps) {
  const dispatch = useAppDispatch();

  const isEdit = mode === 'edit';
  const hasCompanies = companies.length > 0;

  const companiesOptions = companies.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const lastCreatedCompanyId = useAppSelector(selectLastCreatedCompanyId);

  React.useEffect(() => {
    return () => {
      dispatch(resetLastCreatedCompanyId());
    };
  }, [dispatch]);

  return (
    <div className="mx-start flex w-full max-w-3xl flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {isEdit ? 'Edit application' : 'Add  application'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEdit
              ? 'Update this job application details.'
              : 'Create a new job application entry.'}
          </p>
        </div>
      </div>

      <Form<ApplicationFormField, StateWithFormError<ApplicationFormField>>
        id={formId}
        state={state}
        action={action}
        className="space-y-2"
      >
        <section className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Basics
          </p>

          <div>
            <div className="grid gap-x-5 md:grid-cols-2">
              <FormField<ApplicationFormField>
                state={state}
                field="role"
                label="Role"
                placeholder="JavaScript Developer"
                required
                defaultValue={initial.role}
                inputProps={{
                  autoFocus: true,
                }}
              />

              <FormSelectField<ApplicationFormField>
                state={state}
                field="companyId"
                label="Company"
                placeholder={
                  hasCompanies ? 'Select company' : 'No companies yet'
                }
                options={companiesOptions}
                defaultValue={initial.companyId}
                forceValue={lastCreatedCompanyId || undefined}
                required
                selectProps={{ disabled: !hasCompanies }}
                labelExtra={
                  !hasCompanies && (
                    <p className="text-xs text-muted-foreground">
                      You don&apos;t have any companies yet. Create new one.
                    </p>
                  )
                }
                inlineAddon={<AddCompanyButton label="New" />}
              />
            </div>

            <div className="mt-4 grid gap-x-5 md:grid-cols-2 lg:grid-cols-3">
              <FormSelectField<ApplicationFormField>
                state={state}
                field="status"
                label="Status"
                placeholder="Select status"
                options={buildEnumOptions(ApplicationStatus)}
                defaultValue={initial.status}
              />

              <FormSelectField<ApplicationFormField>
                state={state}
                field="seniority"
                label="Seniority"
                placeholder="Select seniority"
                options={buildEnumOptions(ApplicationSeniority)}
                defaultValue={initial.seniority}
              />

              <FormSelectField<ApplicationFormField>
                state={state}
                field="employmentType"
                label="Employment type"
                placeholder="Select employment type"
                options={buildEnumOptions(EmploymentType)}
                defaultValue={initial.employmentType}
              />
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Compensation
          </p>

          <div className="grid gap-x-5 md:grid-cols-3">
            <FormField<ApplicationFormField>
              state={state}
              field="salaryMin"
              label="Salary min"
              defaultValue={
                initial.salaryMin != null
                  ? String(initial.salaryMin)
                  : undefined
              }
              inputProps={{ inputMode: 'numeric' }}
            />

            <FormField<ApplicationFormField>
              state={state}
              field="salaryMax"
              label="Salary max"
              defaultValue={
                initial.salaryMax != null
                  ? String(initial.salaryMax)
                  : undefined
              }
              inputProps={{ inputMode: 'numeric' }}
            />

            <FormSelectField<ApplicationFormField>
              state={state}
              field="currency"
              label="Currency"
              placeholder="Select salary currency"
              options={buildEnumOptions(Currency, 'uppercase')}
              defaultValue={initial.currency}
            />
          </div>

          <FormTextareaField<ApplicationFormField>
            state={state}
            field="compensationNote"
            label="Compensation notes"
            placeholder="Bonus, stock options, remote policy…"
            rows={4}
            defaultValue={initial.compensationNote || ''}
          />
        </section>

        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Meta
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <FormSelectField<ApplicationFormField>
              state={state}
              field="source"
              label="Source"
              placeholder="Select application source"
              options={buildEnumOptions(ApplicationSource)}
              defaultValue={initial.source ?? undefined}
            />

            <FormField<ApplicationFormField>
              state={state}
              field="sourceUrl"
              label="Source URL"
              defaultValue={initial.sourceUrl ?? undefined}
            />
          </div>
        </section>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-muted-foreground"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending || !hasCompanies}
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {pending ? (isEdit ? 'Saving…' : 'Creating…') : submitLabel}
          </button>
        </div>
      </Form>
    </div>
  );
}
