export default function getRandomPort() {
  // Generate a random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (9000 - 4000 + 1)) + 4000
}