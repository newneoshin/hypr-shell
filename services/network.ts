import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { createBinding, createComputed } from "gnim"
import NM from "gi://NM?version=1.0"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

export const networkLabel = createComputed<string>(() => {
  switch (connection()) {
    case "lan":
      return wiredLabel(wired()!)
    case "wifi":
      return wifiLabel(wifi()!)
    case "disconnected":
      return "DISCONNECTED"
  }
})

type ConnectionType = "lan" | "wifi" | "disconnected"

const network = AstalNetwork.get_default()

const wired = createBinding(network, "wired")
const wifi = createBinding(network, "wifi")
const connectivity = createBinding(network, "connectivity")

const connection = createComputed<ConnectionType>(() => {
  if (wired() !== null) {
    return "lan"
  }

  if (wifi() !== null) {
    return "wifi"
  }

  return "disconnected"
})

const device = createComputed<NM.Device | null>(() => {
  switch (connection()) {
    case "lan":
      return wired()!.device
    case "wifi":
      return wifi()!.device
    case "disconnected":
      return null
  }
})

const ping = createPoll(-1, 3000, async () => {
  const gateway = device()?.get_ip4_config()?.get_gateway()
  if (!gateway) return -1
  const stdout = await execAsync([
    "bash",
    "-c",
    `LC_ALL=C ping -c 1 -W 1 ${gateway} 2>/dev/null | grep -oP '(?<=time=)[0-9.]+'`,
  ])
  return stdout ? parseFloat(stdout) : -1
})

function fetchIP() {
  const ip = device()?.get_ip4_config()?.get_addresses()[0]?.get_address()
  return ip ? ip : "NOT FOUND"
}

function connectivityFriendly() {
  switch (connectivity()) {
    case AstalNetwork.Connectivity.FULL:
      return "CONNECTED"
    case AstalNetwork.Connectivity.LIMITED:
      return "LIMITED"
    case AstalNetwork.Connectivity.PORTAL:
      return "LOGIN REQUIRED"
    case AstalNetwork.Connectivity.NONE:
      return "NO INTERNET"
    default:
      return "CHECKING..."
  }
}

function pingLabel() {
  const value = ping()
  return value === -1 ? "—" : `${value}ms`
}

function wiredLabel(wired: AstalNetwork.Wired) {
  const ip = fetchIP()

  return `LAN (${ip}) · ${wired.speed} Mbps · ${pingLabel()} · ${connectivityFriendly()}`
}

function wifiLabel(wifi: AstalNetwork.Wifi) {
  const ip = fetchIP()
  return `${wifi.ssid} (${ip}) · ${wifi.strength}% · ${pingLabel()} · ${connectivityFriendly()}`
}
