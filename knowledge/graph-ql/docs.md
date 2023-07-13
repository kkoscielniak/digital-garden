---
title: GraphQL Documentation
---

Most of the Documentation for our server can be generated automatically.

However, we can enrich it (with Markdown):

```graphql
type OurQuery {
	"A simple greeting"
	greeting: String!

	"Day of week"
	dayOfWeek: DayOfWeek!
}

"""
# day of week
## represents the day of week
"""
enum DayOfWeek {
	MON
	TUE
	WED
	...
}
```
