### Backend Server For the Flutterwavego Node.js Backend Engineer Role 


## Rules to Validate against 

1. Request

```{
  "rule": {
    "field": "missions",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}```

Sample Response

```{
    "data": {
        "validation": {
            "error": false,
            "field": "missions",
            "field_value": "missions",
            "condition": "gte",
            "condition_value": 30
        }
    },
    "status": "success",
    "message": "field missions successfully validated."
}```


2. Request

```{
  "rule": {
    "field": "missions.count",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      "count": 45,
      "successful": 44,
      "failed": 1
    }
  }
}```

Sample Response 

```
{
    "data": {
        "validation": {
            "error": false,
            "field": "missions.count",
            "field_value": 45,
            "condition": "gte",
            "condition_value": 30
        }
    },
    "status": "success",
    "message": "field missions.count successfully validated."
}```

3. Request 

```{
  "rule": {
    "field": "0",
    "condition": "eq",
    "condition_value": "a"
  },
  "data": "damien-marley"
}```

Sample Response

```
{
    "data": {
        "validation": {
            "error": true,
            "field": "0",
            "field_value": "d",
            "condition": "eq",
            "condition_value": "a"
        }
    },
    "status": "error",
    "message": "field 0 fialed validation."
}```


4. Request

```{
  "rule": {
    "field": "5",
    "condition": "contains",
    "condition_value": "rocinante"
  },
  "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
}```


Sample Response

```{
    "data": null,
    "status": "error",
    "message": "field 5 is missing from data."
}```
