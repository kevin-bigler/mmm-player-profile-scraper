# API

## Scrape Player Profile

### [GET] [/scrape]

Request that a scrape job begin.

Request:

```
{
	"nintendoId": "joebob1990"
}
```

Schema:

```
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"required": [ "nintendoId" ],
	"properties": {
		"nintendoId": {
			"type": "string",
			"description": "Nintendo ID of the player's profile. Found in mario maker website profile URL (e.g. https://supermariomakerbookmark.nintendo.net/profile/joebob1990?type=posted )."
		}
	}
}
```

#### Success Response

Status: `200`

Body:

```
{
	"playerProfile": object
}
```

#### Player Not Found

The Player's profile was not found on Nintendo's website.

Status: `404`

Body:

```
{
	"error": "string"
}
```