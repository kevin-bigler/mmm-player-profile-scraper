# API


## Endpoints

- [Scrape Player Profile](#scrape) `[GET] [/scrape]`
- [Get Player Profile Snapshot - Latest](#latest) `[GET] [/latest]`
- [Get Player Profile Snapshots - Time Range](#between) `[GET] [/between]`


## <a name="scrape"></a>Scrape Player Profile

### [GET] [/scrape]

Request that a scrape job begin.

#### Request:

Body:

```
{
	"nintendoId": "joebob1990"
}
```

Schema:

```
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "",
	"type": "object",
	"required": [ "nintendoId" ],
	"properties": {
		"nintendoId": {
			"type": "string",
			"description": "Nintendo ID of the player's profile. Found in mario maker website profile URL (e.g. https://supermariomakerbookmark.nintendo.net/profile/joebob1990?type=posted )."
		}
	}
}
```

#### Response

##### Success [200]

Body:

```
{
	"playerProfile": object
}
```

##### Player Not Found [404]

The Player's profile was not found on Nintendo's website.

Body:

```
{
	"error": "string"
}
```

##### Bad Request [400]

Missing or invalid nintendoId

Body:

```
{
	"error": "string"
}
```


## <a name="latest"></a>Get Player Profile Snapshot - Latest


### [GET] [/latest]

Get latest profile snapshot for a given player.

#### Request:

Body:

```
{
	"nintendoId": "joebob1990"
}
```

Schema:

```
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "",
	"type": "object",
	"required": [ "nintendoId" ],
	"properties": {
		"nintendoId": {
			"type": "string",
			"description": "Nintendo ID of the player's profile. Found in mario maker website profile URL (e.g. https://supermariomakerbookmark.nintendo.net/profile/joebob1990?type=posted )."
		}
	}
}
```

#### Response

##### Success [200]

Body:

```
{
	"playerProfile": object
}
```

##### Player Not Found [404]

There are no profile snapshots for that given player.

Body:

```
{
	"error": "string"
}
```

##### Bad Request [400]

Missing or invalid nintendoId

Body:

```
{
	"error": "string"
}
```


## <a name="between"></a>Get Player Profile Snapshots - Time Range


### [GET] [/between]

Get all profile snapshots for a given player, between a time range (inclusive).

#### Request:

Body:

```
{
	"nintendoId": "joebob1990",
	"from": "2017-06-05T23:00.00",
	"to": "2017-06-05T23:00.00"
}
```

Schema:

```
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "",
	"type": "object",
	"required": [ "nintendoId", "from", "to" ],
	"properties": {
		"nintendoId": {
			"type": "string",
			"description": "Nintendo ID of the player's profile. Found in mario maker website profile URL (e.g. https://supermariomakerbookmark.nintendo.net/profile/joebob1990?type=posted )."
		},
		"from": {
			"type": "string",
			"description": "Timestamp in the format YYYY-MM-ddTHH:MM:ss.ii"
		},
		"to": {
			"type": "string",
			"description": "Timestamp in the format YYYY-MM-ddTHH:MM:ss.ii"
		}
	}
}
```

#### Response

##### Success [200]

Body:

```
{
	"playerProfiles": [object]
}
```

##### Player Not Found [404]

No profile snapshots for the player during that time interval.

Body:

```
{
	"error": "string"
}
```

##### Bad Request [400]

Missing or invalid nintendoId; or missing or invalid start and/or end times ("from" and "to").

Body:

```
{
	"error": "string"
}
```

