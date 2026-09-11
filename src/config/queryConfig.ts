export interface Filters {
  country?: string
  state?: string
  city?: string
}

export type Entity = 'country' | 'state' | 'city'

export const queryConfig = {
  country: {
    table: 'countries',
    dependsOn: [],
    build: (f: Filters) => '',
  },

  state: {
    table: 'states',
    dependsOn: ['country'],
    build: (f: Filters) => `
  country_code = (
    SELECT country_code
    FROM countries
    WHERE name = '${f.country}'
)`,
  },

  city: {
    table: 'cities',
    dependsOn: ['country', 'state'],
    build: (f: Filters) => `
state_code = (
    SELECT state_code
    FROM states
    WHERE name = '${f.state}'
      AND country_code = (
          SELECT country_code
          FROM countries
          WHERE name = '${f.country}'
      )
)
 AND
country_code = (
    SELECT country_code
    FROM countries
    WHERE name = '${f.country}'
)`,
  },
} satisfies Record<
  Entity,
  {
    table: string
    dependsOn: string[]
    build: (filters: Filters) => string
  }
>

/*
SELECT name
FROM cities
WHERE state_code = (
    SELECT state_code
    FROM states
    WHERE name = 'Edo State'
      AND country_code = (
          SELECT country_code
          FROM countries
          WHERE name = 'Nigeria'
      )
)
AND country_code = (
          SELECT country_code
          FROM countries
          WHERE name = 'Nigeria'
      )
*/