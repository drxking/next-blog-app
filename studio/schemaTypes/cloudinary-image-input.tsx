import {useState} from 'react'
import {Button, Card, Stack, Text} from '@sanity/ui'
import {set, unset, type StringInputProps} from 'sanity'

const cloudName = import.meta.env.SANITY_STUDIO_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.SANITY_STUDIO_CLOUDINARY_UPLOAD_PRESET

export function CloudinaryImageInput(props: StringInputProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function upload(file?: File) {
    if (!file) return
    if (!cloudName || !uploadPreset) {
      setError('Add the Cloudinary Studio environment variables before uploading.')
      return
    }
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.')
      return
    }
    setUploading(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('upload_preset', uploadPreset)
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {method: 'POST', body: form})
      const result = await response.json()
      if (!response.ok || !result.secure_url) throw new Error(result.error?.message || 'Cloudinary upload failed.')
      props.onChange(set(result.secure_url))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cloudinary upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return <Stack space={3}>
    <Button as="label" mode="ghost" tone="primary" disabled={uploading}>
      {uploading ? 'Uploading to Cloudinary…' : 'Upload image to Cloudinary'}
      <input hidden type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => upload(event.target.files?.[0])} />
    </Button>
    {props.value && <Card padding={3} tone="positive"><Stack space={2}><Text size={1}>Stored in Cloudinary</Text><Text size={1} muted textOverflow="ellipsis">{props.value}</Text><Button fontSize={1} mode="bleed" tone="critical" onClick={() => props.onChange(unset())}>Remove image</Button></Stack></Card>}
    {error && <Text size={1} weight="medium" style={{color: 'var(--card-critical-fg-color)'}}>{error}</Text>}
  </Stack>
}
