type StateName =
  | 'lead'
  | 'prospect'
  | 'trial active'
  | 'trial active, yearly dromant'
  | 'yearly active'
  | 'yearly grace period'
  | 'yearly active, yearly dormant'
  | 'monthly active'
  | 'monthly grace period'
// | 'monthly gift active'

type Trigger =
  | 'activate free trial'
  | 'buy yearly'
  | 'buy monthly'
  | 'buy prolongation'
  | 'redeem monthly gift'
  | 'prolongation auto-payed'
  | 'active period ends'
  | 'grace period ends'

type State = {
  [key in Trigger]?: StateName
}

type States = {
  [key in StateName]: State
}

const states: States = {
  lead: {
    'buy yearly': 'yearly active',
    'buy monthly': 'monthly active',
    'activate free trial': 'trial active'
  },
  prospect: {
    'buy yearly': 'yearly active',
    'buy monthly': 'monthly active'
  },
  'trial active': {
    'buy yearly': 'trial active, yearly dromant',
    'active period ends': 'prospect'
  },
  'trial active, yearly dromant': {
    'active period ends': 'yearly active'
  },
  'yearly active': {
    'active period ends': 'yearly grace period',
    'buy prolongation': 'yearly active',
    'buy yearly': 'yearly active, yearly dormant'
    // 'redeem monthly gift'
  },
  'yearly active, yearly dormant': {
    'active period ends': 'yearly active'
  },
  'yearly grace period': {
    'buy prolongation': 'yearly active',
    'prolongation auto-payed': 'yearly active',
    'buy yearly': 'yearly active, yearly dormant',
    'grace period ends': 'prospect'
  },
  'monthly active': {
    'active period ends': 'monthly grace period',
    'prolongation auto-payed': 'monthly active'
  },
  'monthly grace period': {
    'prolongation auto-payed': 'monthly active',
    'grace period ends': 'prospect'
  }
}
