/**
 * Renders one or more Schema.org JSON-LD <script> tags.
 *
 * Replaces the repeated `dangerouslySetInnerHTML` boilerplate found across
 * every layout file.  Usage:
 *
 *   <StructuredData data={jsonLd} />
 *   <StructuredData data={[jsonLd, breadcrumbLd]} />
 */

interface StructuredDataProps {
  /** A single schema object or an array of schema objects */
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
