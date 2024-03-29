import { orderBy } from 'lodash-es'

function sortVersions() {
  const arr = [
    '14.0',
    '14.1',
    '15.0',
    '15.0',
    '15.0',
    '15.1',
    '15.1',
    '15.1',
    '15.2',
    '15.2',
    '15.2',
    '15.3',
    '15.3',
    '15.3',
    '15.4',
    '15.4',
    '15.4',
    '15.5',
    '15.5',
    '15.5',
    '12.8.1',
    '12.8.1',
    '12.9.0',
    '13.0.3',
    '13.0.3',
    '13.0.3',
    '13.1.1',
    '13.1.2',
    '13.1.2',
    '13.1.3',
    '14.0.1',
    '14.0.2',
    '14.0.2',
    '14.0.3',
    '14.0.3',
    '14.0.3',
    '14.1.1',
    '14.1.2',
    '14.1.2',
    '14.1.2',
    '14.1.2',
    '14.1.2',
    '12.10.0',
    '12.11.1',
  ]

  arr.sort((a, b) => {
    let i = 0
    const arr1 = a.split('.')
    const arr2 = b.split('.')

    while (true) {
      const s1 = arr1[i]
      const s2 = arr2[i++]

      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length
      }

      if (s1 === s2) continue

      return s2 - s1
    }
  })

  console.log(arr)
}


const data = {
    "15.4": {
        "count": 8597,
        "ratio": "26.184022%"
    },
    "15.3": {
        "count": 2802,
        "ratio": "8.534097%"
    },
    "13.0.3": {
        "count": 950,
        "ratio": "2.89343%"
    },
    "15.5": {
        "count": 8620,
        "ratio": "26.254074%"
    },
    "14.1.1": {
        "count": 926,
        "ratio": "2.820333%"
    },
    "15.1": {
        "count": 1605,
        "ratio": "4.888375%"
    },
    "13.1.3": {
        "count": 3245,
        "ratio": "9.883349%"
    },
    "14.1.2": {
        "count": 2228,
        "ratio": "6.785856%"
    },
    "15.0": {
        "count": 483,
        "ratio": "1.471081%"
    },
    "14.1": {
        "count": 90,
        "ratio": "0.274114%"
    },
    "15.2": {
        "count": 295,
        "ratio": "0.898486%"
    },
    "14.0.2": {
        "count": 229,
        "ratio": "0.697469%"
    },
    "14.0.1": {
        "count": 160,
        "ratio": "0.487315%"
    },
    "14.0": {
        "count": 4,
        "ratio": "0.012183%"
    },
    "13.1.2": {
        "count": 76,
        "ratio": "0.231474%"
    },
    "13.1.1": {
        "count": 62,
        "ratio": "0.188834%"
    },
    "12.9.0": {
        "count": 193,
        "ratio": "0.587823%"
    },
    "12.10.0": {
        "count": 289,
        "ratio": "0.880212%"
    },
    "14.0.3": {
        "count": 1661,
        "ratio": "5.058935%"
    },
    "12.11.1": {
        "count": 148,
        "ratio": "0.450766%"
    },
    "12.8.1": {
        "count": 170,
        "ratio": "0.517772%"
    }
}

console.log(orderBy(data, ['']));