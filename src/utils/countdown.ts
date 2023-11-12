
const time = "8 Jun 2024"

const storkKmPerDay = 300
const secondsInADay = 60 * 60 * 24
const storkKMPerSec = storkKmPerDay / secondsInADay
const countTo = new Date(time).getTime()

const calculateKms = () => {
  const now = new Date().getTime()
  const timeDifference = countTo - now
  const seconds = Math.ceil(timeDifference / 1000);
  const totalKMs = seconds * storkKMPerSec

  return totalKMs
}

const kms = calculateKms();

const handlers = []

const obj = {
  kms,
  onChange: v => {
    v(kms)
    handlers.push(v)
  },
  handlers: []
} 

export const countdown = new Proxy(obj, {
  set(target, prop, value) {
    if(prop === "kms") {
      handlers.forEach(v => v(value))
      return Reflect.set(target, prop, value);
    }
    return false
  }
})

const update = () => {
  countdown.kms = calculateKms()
}

setInterval(update, 1000)

