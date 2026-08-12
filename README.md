# hypr-shell

Hyprland용 통합 데스크톱 셸입니다. 기존에 Waybar(상태바) + SwayNotificationCenter(알림) + Walker(앱 런처)로 나뉘어 있던 세 프로세스를 하나의 AGS(Astal4/GTK4) 애플리케이션으로 통합했습니다.

## 왜 통합했나

- **Waybar → AGS bar** — 다른 두 창과 프로세스/상태를 공유하고, CSS 소스를 하나로 관리하기 위해.
- **SwayNotificationCenter → AGS window + `astal-notifd`** — 알림 개수 같은 상태를 IPC 없이 바에서 바로 읽기 위해.
- **Walker → AGS window + `AstalApps`** — 실제로 쓰던 기능이 앱 검색뿐이라, `elephant` 프로바이더 아키텍처 없이 `AstalApps.fuzzy_query()`만으로 충분해서.

디자인 언어는 원래 기존 macOS Dock × Glassmorphism 테마를 그대로 옮길 계획이었지만, 도중에 **Neo-Brutalism**(불투명 배경, 두꺼운 테두리, 하드 오프셋 섀도우, 각진 모서리)으로 전환했습니다.

## 현재 구현된 것

- **Bar** — `NETWORK` / `BRIGHTNESS` / `VOLUME` / `BATTERY` / `NOTIFICATIONS` 텍스트 셀. 왼쪽 끝에는 현재 워크스페이스 번호를 보여주는 셀이 있고, 클릭하면 System Control이 열립니다.
- **Detail Panel** — `NETWORK`/`BRIGHTNESS`/`VOLUME`/`BATTERY` 셀에 마우스를 올리면 바 아래로 뜨는 상세 패널(네트워크는 텍스트, 나머지는 프로그레스 바).
- **System Control** — 왼쪽 트리거로 여는 사이드바. `POWEROFF`/`REBOOT`/`SUSPEND` 버튼과 10개 워크스페이스 스위처(현재 포커스된 워크스페이스와 각 워크스페이스의 마지막 활성 앱을 보여줌)로 구성됩니다.
- **Notification Sidebar** — `astal-notifd` 기반 알림 히스토리 목록. 오른쪽 트리거로 열립니다.

## 아직 없는 것

- **앱 런처** — `AstalApps` 기반으로 Walker의 fuzzy 앱 검색을 대체할 예정이나 아직 미착수.
- **Semantic/accent 컬러** — 배터리 부족 경고색 등 danger/warning/success 톤이 디자인에서 아직 정의되지 않음.

## 기술 스택

- [AGS](https://github.com/Aylur/ags) + [Astal4](https://github.com/Aylur/astal) (GTK4), TypeScript/TSX, Gnim(GJS용 JSX 런타임)
- `AstalNotifd`, `AstalHyprland`, `AstalNetwork`, `AstalBrightness`, `AstalWp`, `AstalBattery`
- SCSS(dart-sass)로 작성하고, 실제 디자인 토큰은 GTK4의 CSS custom property(`--ui-*`)로 관리

## 요구 사항

- Hyprland 0.55+ (Lua API 설정 기준)
- GTK 4.22+ (CSS custom property 지원 확인된 버전)
- `JetBrainsMono Nerd Font Mono` (아이콘 글리프까지 포함해 모든 텍스트에 사용)

## 사용법

이 리포는 `~/.config/ags`로 심볼릭 링크해서 사용합니다.

```bash
ln -s /path/to/hypr-shell ~/.config/ags
ags run app.ts
```

핫 리로드는 지원하지 않아서, 코드를 바꾼 뒤에는 항상 재시작합니다.

```bash
ags quit && ags run app.ts &
```

Hyprland 쪽에는 `SUPER + S`(System Control 토글), `SUPER + N`(Notification Sidebar 토글) 키바인드가 `ags request toggle-system-control` / `ags request toggle-notifications`를 호출하도록 연결되어 있습니다.

## 디렉토리 구조

```
hypr-shell/
├── app.ts              # 진입점 — 모든 창을 띄우고, CLI 토글용 requestHandler를 정의
├── windows/             # 레이어셸 서피스 단위 (bar, detail-panel, system-control, notification-sidebar)
├── services/            # Astal 라이브러리 래퍼 — 창 사이에서 공유하는 반응형 상태
├── components/          # 여러 창이 공유하는 구조/동작 프리미티브 (예: 오버레이 창 래퍼)
├── style/               # SCSS. main.scss가 진입점, _variables.scss가 디자인 토큰
└── utils/                # 순수 헬퍼 함수 (Figma 좌표 변환, 상대 시간 포맷 등)
```

각 `windows/` 하위 폴더는 Hyprland 레이어셸 서피스 하나와 1:1로 대응하며, 필요 시 `hyprland.lua`의 `hl.layer_rule`에서 같은 이름의 `namespace`로 타겟할 수 있습니다.
