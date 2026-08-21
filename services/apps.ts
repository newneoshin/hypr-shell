import AstalApps from "gi://AstalApps?version=0.1"

const apps = new AstalApps.Apps()

export function listApps() {
  return apps.get_list()
}

export function fuzzyScore(query: string, app: AstalApps.Application) {
  return apps.fuzzy_score(query, app)
}

export function matchesQuery(query: string, app: AstalApps.Application) {
  return fuzzyScore(query, app) >= apps.min_score
}

export function launchApp(app: AstalApps.Application) {
  app.launch()
}
