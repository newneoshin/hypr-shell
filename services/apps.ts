import AstalApps from "gi://AstalApps?version=0.1"

const apps = new AstalApps.Apps()

export function fuzzyQuery(query: string | null) {
  return apps.fuzzy_query(query)
}

export function launchApp(app: AstalApps.Application) {
  app.launch()
}
