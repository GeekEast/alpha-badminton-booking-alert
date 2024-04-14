# Badminton Booking Alarm


## Install
```sh
pnpm install
pnpm dev
```

## Create Subscription
```sh
# goto http://[::1]:8194/api/ap-southeast-2/graphql
```

```graphql
mutation BBAAddSubscription($subscription: BBAAddSubscriptionDto!) {
  BBAAddSubscription(subscription: $subscription) {
    id
    start
    end
    user {
      firstName
      lastName
      email
      timezone
    }
    court
    enableEmail
    lastEmailSentAt
    interval
    createdAt
    updatedAt
    archivedAt
    tags {
      name
      value
    }
  }
}
```
- booking website: https://alphabadminton.yepbooking.com.au/
- timezone: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
```json
{
  "subscription": {
    "enableEmail": true,
    "interval": 30,

    "court": "18",
    "year": 2024,
    "month": 4,
    "day": 18,
    "startHour": 18,
    "endHour": 22,

    "user": {
      "email": "<your email>",
      "firstName": "firstName",
      "lastName": "lastName",
      "timezone": "Australia/Sydney"
    },
  }
}
```