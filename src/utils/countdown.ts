import { proxy } from "valtio"

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

export const countdown = proxy({ kms })

const update = () => {
  countdown.kms = calculateKms()
}

setInterval(update, 1000)

