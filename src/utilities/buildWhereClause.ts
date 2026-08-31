type Filters = Record<string, string>

const builders = {
  country: (filters: Filters) => `
country_code = (
    SELECT country_code
    FROM countries
    WHERE name = '${filters.country}'
)`,

  state: (filters: Filters) => `
state_code = (
    SELECT state_code
    FROM states
    WHERE name = '${filters.state}'
      AND country_code = (
          SELECT country_code
          FROM countries
          WHERE name = '${filters.country}'
      )
)`,
}

export function buildWhereClause(filters: Filters): string {
  const clauses: string[] = []

  if (filters.state) {
    clauses.push(builders.state(filters))
  }

  if (filters.country) {
    clauses.push(builders.country(filters))
  }

  return clauses.join('\nAND\n')
}