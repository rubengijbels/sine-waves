export const run = (fps, stage, func) => {
  const interval = (1 / fps) * 1000
  setInterval(() => {
    func()
    stage.update()
  }, interval)
}
