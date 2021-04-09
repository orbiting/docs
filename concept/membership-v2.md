# Membership V2

## Tables

### user

| Field | |
| --- | --- |
| **`id`** | |
| **`auto_renew`** | Boolean |
| **`current_product`** | enum(ABO, BENEFACTOR_ABO, MONTHLY_ABO, ABO_GIVE_MONTHS) |

### subscription credit

| Field | |
| --- | --- |
| **`id`** | |
| **`user_id`** | |
| **`credit`** | INT, Amount of days |
| **`createdAt`** | Date |

### subscription debit

| Field | |
| --- | --- |
| **`user_id`** | |
| **`debit`** | |
| **`createdAt`** | Date |
| **`endedAt`** | NULL | Date |

`CONSTRAINT "only one active debit per user" UNIQUE(user.id, endedAt)`

### payment history

| Field | |
| --- | --- |
| **`price`** | |
| **`product`** | enum(ABO, BENEFACTOR_ABO, MONTHLY_ABO, ABO_GIVE_MONTHS) |
| **`subscription`.id** | |

## Queries

```SQL
# is active
SELECT
  COUNT(*) > 0 AS is_active
FROM
  subscription_debit
WHERE
  user_id = $userId
AND
  endedAt = NULL
GROUP BY
  user_id;

# balance
SELECT
  subscription_credit.user_id,
  SUM(subscription_credit.credit) AS "sum_credit",
  SUM(subscription_debit.debit) AS "sum_debit",
  (sum_credit - sum_debit) AS balance
FROM
  subscription_credit
INNER JOIN
  subscription_debit
ON
  subscription_credit.user_id = subscription_debit.user_id
WHERE
  user_id = $user_id
GROUP BY
  user_id
```