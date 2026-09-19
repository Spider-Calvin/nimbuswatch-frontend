import { useForm } from '@tanstack/react-form'
import { Button } from './ui/button'
import type { ServiceInput } from '../lib/api'

export function ServiceForm({
  defaultValues = { name: '', url: '' },
  onSubmit,
  submitLabel = 'Save',
}: {
  defaultValues?: ServiceInput
  onSubmit: (value: ServiceInput) => Promise<unknown>
  submitLabel?: string
}) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value)
      form.reset()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-2"
    >
      <form.Field
        name="name"
        validators={{ onChange: ({ value }) => (value ? undefined : 'name is required') }}
      >
        {(field) => (
          <div>
            <input
              placeholder="Service name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
            )}
          </div>
        )}
      </form.Field>
      <form.Field
        name="url"
        validators={{ onChange: ({ value }) => (value ? undefined : 'url is required') }}
      >
        {(field) => (
          <div>
            <input
              placeholder="https://example.com"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
            )}
          </div>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? 'Saving...' : submitLabel}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
