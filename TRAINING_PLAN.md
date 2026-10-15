# React Native Training Plan: Flutter Dev → Production-Ready RN Engineer

A structured plan to go from "I know Flutter" to "I can build, ship and defend a React Native app in an interview".

**Stack targeted:** Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript · New Architecture
**Docs to trust:** https://docs.expo.dev/versions/v57.0.0/ · https://react.dev · https://reactnative.dev
**Vehicle:** this repo (`mini-shop`). Every phase adds a real feature to the shop, so by the end you'll have a portfolio app you can demo in an interview rather than a pile of throwaway snippets.

---

## How to Use This Plan

- Work through the **phases in order**. Within a phase, the order of modules is flexible.
- Each module has:
  - **Learn** — concepts to understand (read the docs, don't just copy code)
  - **Flutter lens** — what you already know that maps to it
  - **Build** — concrete tasks in `mini-shop`
  - **Done when** — a checkable bar for moving on
  - **Interview check** — questions you should be able to answer out loud in under 2 minutes
- Commit after every module, using a branch per phase if you like. Your git history becomes evidence of the journey.
- Suggested pace: **~8–10 hrs/week → ~20 weeks**. Phases 0–3 are the foundation. Don't rush them.

| Phase | Theme | Est. weeks |
|---|---|---|
| 0 | Orientation & mental model | 1 |
| 1 | React core (hooks): see [EXERCISES.md](EXERCISES.md) | 3 |
| 2 | UI: layout, styling, components, lists | 2 |
| 3 | Navigation & app architecture | 2 |
| 4 | State & data: Redux, server state, persistence, forms | 3 |
| 5 | Animation & gestures | 2 |
| 6 | Device & native features | 3 |
| 7 | Native modules & config plugins | 1 |
| 8 | Quality: testing, performance, accessibility, i18n | 2 |
| 9 | Ship it: builds, releases, OTA, monitoring | 1 |
| 10 | Capstone polish & interview prep | ongoing |

---

## Flutter → React Native Rosetta Stone

Keep this table handy. Most of your Flutter intuition carries over, but the places where it *doesn't* are where bugs come from.

| Flutter | React Native / Expo | Notes |
|---|---|---|
| `Widget` | Component (a function returning JSX) | |
| `StatelessWidget` | Function component with props | |
| `StatefulWidget` + `setState` | `useState` / `useReducer` | State is a per-render *snapshot*, not a mutable field |
| `initState` / `dispose` | `useEffect(() => { ...; return cleanup }, [])` | |
| `didUpdateWidget` | `useEffect` with dependencies | |
| `build()` | The component function body | Runs on **every** render, so keep it pure |
| `const` widgets | `React.memo` / React Compiler | Without memo, children re-render whenever the parent does |
| `Key` | `key` prop | Required in lists and also used to reset state |
| `InheritedWidget` / `Provider` | Context (`createContext` + `useContext`) | |
| Riverpod / Bloc | Redux Toolkit, Zustand, Jotai | |
| `FutureBuilder` | TanStack Query (or `useEffect` + state) | |
| `StreamBuilder` | Subscription in `useEffect`, or `useSyncExternalStore` | |
| `Column` / `Row` | `<View style={{ flexDirection: 'column' \| 'row' }}>` | Column is the default |
| `Container`, `Padding`, `SizedBox` | `<View style={...}>` | |
| `Expanded` / `Flexible` | `flex: 1` / `flexGrow`, `flexShrink` | |
| `Stack` + `Positioned` | `position: 'absolute'` | |
| `ListView.builder` | `FlatList` / `FlashList` | |
| `GestureDetector` / `InkWell` | `Pressable` / Gesture Handler | |
| `Navigator` / `go_router` | React Navigation / **Expo Router** | Expo Router is file-based, like go_router + routes from folders |
| `MediaQuery` | `useWindowDimensions`, `useSafeAreaInsets` | |
| `Theme.of(context)` | Your own context + `useColorScheme()` | No built-in Material theme |
| `AnimationController` | Reanimated shared values | |
| `MethodChannel` / Pigeon | Expo Modules API (Swift/Kotlin), Turbo Modules | |
| `Isolate` | No direct equivalent | Worklets run on the UI thread; heavy work → native |
| `pubspec.yaml` | `package.json` + `app.json`/`app.config.ts` | |
| Hot reload | Fast Refresh | |
| Flavors | EAS build profiles + `app.config.ts` env | |
| `shared_preferences` | AsyncStorage / `expo-sqlite/kv-store` | |
| `flutter_secure_storage` | `expo-secure-store` | |
| widget tests | Jest + React Native Testing Library | |
| `integration_test` | Maestro (Expo-recommended) / Detox | |
| Codemagic / Fastlane | EAS Build + EAS Submit | |
| Shorebird | EAS Update (`expo-updates`) | OTA JS updates are first-class in RN |

**The big differences to keep in mind**
1. **Everything re-renders by default.** In Flutter you reach for `const`. In React, a parent render re-renders all its children unless they're memoized or the compiler handles it.
2. **State is a snapshot.** `setCount(count + 1); console.log(count)` logs the *old* value. (Your Exercise 1 comments already show you understand this.)
3. **Text must be inside `<Text>`.** A bare string in a `<View>` crashes. Text styles inherit only through nested `<Text>`, not through `<View>`.
4. **No built-in design system.** No Material/Cupertino. You build your own primitives or choose a library.
5. **JS is single-threaded.** Long synchronous work blocks touches and JS-driven animations. Reanimated and native modules are how you get off that thread.
6. **OTA updates.** You can ship JS fixes without App Store review. That's powerful, and it's also an interview topic (runtime versions, rollbacks).

---

## Phase 0 — Orientation & Mental Model (Week 1)

### 0.1 How React Native actually works
**Learn**
- **New Architecture** (the only architecture since RN 0.82):
  - **JSI**: C++ interface letting JS hold direct references to native objects (no more async JSON bridge)
  - **Fabric**: the new renderer; it supports concurrent React features and synchronous layout
  - **Turbo Modules**: lazily loaded, type-safe native modules
  - **Codegen**: generates native glue from TypeScript specs
- **Hermes**: the JS engine that ships with RN (bytecode precompiled at build time → faster startup)
- **Threads**: JS thread, UI/main thread, and background threads (Yoga layout)
- **Yoga**: the cross-platform Flexbox layout engine
- **Metro**: the bundler (equivalent to Flutter's build toolchain + hot reload server)

**Flutter lens:** Flutter paints every pixel with its own engine (Skia/Impeller). RN renders **real native views** (`UIView`, `android.view.View`). That's why RN apps "feel native" for free, and also why iOS and Android can look slightly different.

**Done when:** you can draw a diagram showing what happens between `<Text>Hello</Text>` in JS and pixels on screen.

### 0.2 Expo, workflows and builds
**Learn**
- Expo Go vs **development builds** (`expo-dev-client`). Expo Go is a sandbox with a fixed set of native modules. As soon as you need a custom native library, push notifications on Android, background location on iOS, and so on, you need a dev build.
- **Continuous Native Generation (CNG)** / `npx expo prebuild`: `ios/` and `android/` folders are *generated* from `app.json` + config plugins. Treat them as build artifacts.
- `npx expo install <pkg>` vs `npm install`: the former picks the version compatible with your SDK.
- `npx expo-doctor`: health check for your dependency versions.

**Build**
- [ ] Run `npx expo-doctor` and fix any warnings
- [ ] Create a development build (`npx expo run:ios` locally, or `eas build --profile development`) and run the app in it instead of Expo Go
- [ ] Run `npx expo prebuild --clean` once, look around `ios/` and `android/`, then delete them (add them to `.gitignore`) and understand why that's OK

**Interview check**
- What is the New Architecture and what problem did the old bridge have?
- Expo Go vs dev build vs production build: when do you need each?
- What is CNG and why would a team adopt it?

### 0.3 TypeScript & modern JS for RN
**Learn:** closures, `async/await` & Promises, destructuring, spread, optional chaining, `===`, array methods (`map/filter/reduce/find/some`), immutability, ES modules. TypeScript: `type` vs `interface`, unions & **discriminated unions**, generics, `Record`, `Partial`, `Pick`, `ReturnType`, `as const`, typing props and `children`.

**Flutter lens:** Dart is nominal, sound and null-safe. TS is **structural** and its types are erased at runtime, so validate external data (API responses) with a schema library such as Zod.

**Build**
- [ ] Add typed Redux hooks: `RootState`, `AppDispatch`, `useAppSelector`, `useAppDispatch` in `store/`, and replace the inline `(state: { cart: ... })` selector types in `CartScreen`/`TodoScreen`
- [ ] Type the reducer actions in `cartSlice.ts` with `PayloadAction<...>` (currently `action` is untyped in `addItem`/`removeItem`)
- [ ] Enable `"strict": true` in `tsconfig.json` if it isn't already, and fix the errors

---

## Phase 1 — React Core (Weeks 2–4)

→ Complete **[EXERCISES.md](EXERCISES.md) Parts 1–7**.

In addition, read these react.dev pages. They're short and come up constantly in interviews:
- [ ] *Thinking in React*
- [ ] *Keeping Components Pure*
- [ ] *State as a Snapshot*
- [ ] *Queueing a Series of State Updates*
- [ ] *Preserving and Resetting State* (this is where `key` matters)
- [ ] *You Might Not Need an Effect* ⭐
- [ ] *Synchronizing with Effects* / *Lifecycle of Reactive Effects*
- [ ] *Referencing Values with Refs*
- [ ] React Compiler overview

**Also cover**
- **Component composition:** `children`, render props, compound components (`<Card><Card.Header/></Card>`)
- **Controlled vs uncontrolled** components
- **Lifting state up** vs context vs store: the decision tree
- **Error boundaries** (still class components, or use `react-error-boundary`). Expo Router has its own `ErrorBoundary` export.
- **Suspense** and `use()` (React 19) at a conceptual level
- **`useTransition` / `useDeferredValue`**: keep typing responsive while a big list filters

**Interview check**
- Why must hooks be called unconditionally and in the same order?
- What triggers a re-render? (state change, parent re-render, context change)
- What is the dependency array and what happens if you lie to it?
- `useMemo` vs `useCallback` vs `React.memo`: when is each worth it? What changes with React Compiler?
- What's a stale closure, and how do you fix one?
- Why does StrictMode run effects twice in development?

---

## Phase 2 — UI: Layout, Styling, Components (Weeks 5–6)

### 2.1 Layout with Flexbox (Yoga)
**Learn**
- RN defaults differ from the web: `flexDirection: 'column'`, `alignContent: 'flex-start'`, `flexShrink: 0`, and `flex` takes a single number
- `justifyContent` (main axis) vs `alignItems` (cross axis), `alignSelf`, `flexWrap`, `gap`/`rowGap`/`columnGap`
- `position: 'absolute'` + `top/left/right/bottom`, `zIndex`
- Percentages, `aspectRatio`, `minWidth`/`maxWidth`
- Units are density-independent pixels (like Flutter's logical pixels)

**Build**
- [ ] Recreate 3 layouts from a real app you like (e.g. a Spotify "now playing" screen, an Instagram profile header, a banking dashboard card) on a new `Playground` tab
- [ ] Turn the product list into a responsive **2-column grid on phones / 3–4 columns on tablets** using `useWindowDimensions` + `FlatList numColumns` (you'll need a `key` change when `numColumns` changes. Find out why.)

### 2.2 Styling & theming
**Learn**
- `StyleSheet.create`, style arrays `[styles.a, cond && styles.b]`, inline style trade-offs
- `Platform.OS`, `Platform.select`, and platform-specific files (`Button.ios.tsx` / `Button.android.tsx`)
- Shadows: iOS `shadow*` props vs Android `elevation`, plus the newer `boxShadow` style prop
- Dark mode: `useColorScheme()`; `app.json` currently has `"userInterfaceStyle": "light"`. Change it to `"automatic"`.
- Custom fonts with `expo-font`; icons with `@expo/vector-icons` or `expo-symbols` (SF Symbols)
- Styling libraries worth knowing about (pick one later): NativeWind (Tailwind), Unistyles, Tamagui

**Build**
- [ ] Create a `theme/` folder with design tokens (colours, spacing, radii, typography) for light and dark
- [ ] Build a small component library in `components/ui/`: `Button` (variants: primary/secondary/destructive, loading, disabled), `Card`, `Text` (variants: title/body/caption), `Input`, `Badge`. Then replace the duplicated red-button styles across `CartScreen`, `ProductsScreen` and `TodoScreen` with `<Button>`.
- [ ] Add a custom font across the app
- [ ] Support system dark mode plus an in-app override (builds on Exercise 36)

### 2.3 Core components
**Learn & use each at least once:** `View`, `Text` (`numberOfLines`, `ellipsizeMode`, nesting), `Image` vs **`expo-image`** (caching, placeholders, blurhash, transitions), `ScrollView`, `Pressable` (with `pressed` state, `hitSlop`, `android_ripple`), `TextInput` (`keyboardType`, `secureTextEntry`, `autoComplete`, `returnKeyType`, `onSubmitEditing`), `Switch`, `ActivityIndicator`, `Modal`, `RefreshControl`, `KeyboardAvoidingView`, `StatusBar`, `ImageBackground`.

**Build**
- [ ] Add product images to `data/products.ts` and render them with `expo-image`, using a placeholder and a fade-in transition
- [ ] Build a **product detail screen** with a hero image, title, price, description, quantity selector (Exercise 6) and a sticky "Add to cart" bar at the bottom that respects safe-area insets
- [ ] Handle the keyboard properly on a form screen: try `KeyboardAvoidingView`, then try `react-native-keyboard-controller`, and note the differences

### 2.4 Lists in depth
**Learn**
- `FlatList`: `keyExtractor`, `renderItem`, `ListHeaderComponent`/`ListFooterComponent`/`ListEmptyComponent`, `ItemSeparatorComponent`, `onEndReached`/`onEndReachedThreshold`, `refreshing`/`onRefresh`, `initialNumToRender`, `windowSize`, `getItemLayout`
- `SectionList` with sticky headers
- **FlashList** (`@shopify/flash-list`): cell recycling, and why it's faster
- Why you never nest a `FlatList` inside a `ScrollView` with the same orientation (your `TodoScreen` nests two `FlatList`s in a `View`, so think about converting it to a single `SectionList`)

**Build**
- [ ] Convert `TodoScreen` to a `SectionList` with "Outstanding" / "Completed" sections
- [ ] Add pull-to-refresh and an empty state to the products list
- [ ] Generate 5,000 products and compare `FlatList` vs `FlashList` with the Perf Monitor (dev menu → "Perf Monitor"). Write down the JS/UI FPS numbers.
- [ ] Add a horizontal "Recommended" carousel at the top of the product list (a horizontal `FlatList` inside a vertical list's header)

**Interview check**
- How does `FlatList` virtualise, and what are the common performance mistakes?
- Why is `key={index}` bad?
- How do you handle the keyboard covering inputs?
- How do you write platform-specific code?

---

## Phase 3 — Navigation & App Architecture (Weeks 7–8)

### 3.1 React Navigation (what you have now)
**Learn:** stack, tabs, drawer, nested navigators, `navigation.navigate/push/goBack/popToTop/replace`, route params, **typed navigation** (`RootStackParamList`, `NativeStackScreenProps`), header options, `useFocusEffect`, `useIsFocused`, modals (`presentation: 'modal' | 'formSheet'`), `navigation.setOptions` for dynamic headers.

**Build**
- [ ] Pass `productId` as a param to the new Product Detail screen, with full typing
- [ ] Show a cart-count badge on the Shop tab (`tabBarBadge`) driven by Redux
- [ ] Open the cart as a modal / form sheet from anywhere
- [ ] Use `useFocusEffect` to refresh data when a tab gains focus

### 3.2 Expo Router (the Expo default for new apps)
**Learn:** file-based routes in `app/`, `_layout.tsx`, `(groups)`, dynamic routes `[id].tsx`, `useLocalSearchParams`, `<Link>`, `router.push`, typed routes, `+not-found`, protected routes / redirects, **native tabs**, deep linking for free.

**Build**
- [ ] Create a branch and **migrate the app to Expo Router**:
  ```
  app/
    _layout.tsx              ← Redux Provider, theme provider
    (tabs)/
      _layout.tsx            ← tab bar
      shop/
        _layout.tsx          ← stack
        index.tsx            ← products
        [productId].tsx      ← detail
      todo.tsx
      exercises.tsx
    cart.tsx                 ← presented as modal
    (auth)/login.tsx
  ```
- [ ] Decide which you prefer and write 5 bullet points on why. That's your interview answer to "React Navigation or Expo Router?"

### 3.3 Deep linking & auth flow
**Build**
- [ ] Set a `scheme` in `app.json` (e.g. `minishop`) and make `minishop://product/3` open product 3. Test it with `npx uri-scheme open minishop://product/3 --ios`.
- [ ] Build a fake **auth flow**: a login screen, a token in `expo-secure-store`, an authenticated group of screens, and a redirect to login when logged out. The "splash while checking the token" state must not flash the login screen.
- [ ] Learn the difference between a custom scheme and **Universal Links / App Links**, and what `apple-app-site-association` / `assetlinks.json` are

### 3.4 Project structure
**Learn:** feature folders vs type folders, barrel files (and their downsides), path aliases (`@/components`) via `tsconfig` paths, and a constants/env strategy.

**Build**
- [ ] Restructure into feature folders: `features/cart`, `features/products`, `features/todo`, each owning its components, slice, hooks and tests
- [ ] Add the `@/` path alias

**Interview check**
- How does deep linking work end-to-end on iOS and on Android?
- How would you structure navigation for an app that has onboarding, auth, and a main tabbed area?
- How do you pass data between screens, and what *shouldn't* you put in route params?

---

## Phase 4 — State, Data & Persistence (Weeks 9–11)

### 4.1 Client state: Redux Toolkit properly
You already have slices. Now do it the way a production codebase would.

**Learn:** `configureStore`, typed hooks, `createSelector` (memoized selectors), `createEntityAdapter` (normalised state), `createAsyncThunk`, middleware, Immer (and why mutation works inside `createSlice`), Redux DevTools.

**Build**
- [ ] Move `getCartTotal` from `CartScreen` into a memoized selector `selectCartTotal`, plus `selectCartCount`
- [ ] Convert the cart to `createEntityAdapter`
- [ ] Write a listener middleware that logs analytics events on `addItem`
- [ ] Hook up Redux DevTools (via the Expo dev tools plugin or Reactotron)

### 4.2 Alternatives you should be able to discuss
- [ ] Re-implement the **todo** feature with **Zustand** (on a branch, ~30 minutes). Compare boilerplate, re-render behaviour (selectors), and devtools.
- Know what **Jotai** (atoms) and **Legend State** / **MobX** (observables) are, at a sentence level

### 4.3 Server state: TanStack Query
**Learn:** why server state ≠ client state; `useQuery`, `useMutation`, query keys, `staleTime` vs `gcTime`, invalidation, `useInfiniteQuery`, optimistic updates, retries, `refetchOnWindowFocus` → `focusManager` + `AppState` in RN, `onlineManager` + NetInfo. Also know **RTK Query** exists, since you're already on RTK.

**Build** (use a free fake API such as `https://dummyjson.com/products`)
- [ ] Replace `data/products.ts` with a real fetch through TanStack Query
- [ ] Infinite scrolling with `useInfiniteQuery`
- [ ] Search with debouncing (Exercise 38's `useDebounce`) as a query key
- [ ] Wire `focusManager` to `AppState` so data refreshes when the app returns to the foreground
- [ ] Optimistic "favourite product" toggle that rolls back on error. Simulate the failure.
- [ ] Validate API responses with **Zod** and handle a malformed response gracefully

### 4.4 Persistence & offline
**Learn**
| Need | Tool |
|---|---|
| Small key-value settings | AsyncStorage / `expo-sqlite/kv-store` |
| Secrets (tokens) | `expo-secure-store` (Keychain / Keystore) |
| Structured / relational / large data | `expo-sqlite` (optionally with Drizzle ORM) |
| Files (images, downloads) | `expo-file-system` |
| Persist Redux | `redux-persist`, or a hand-rolled listener + storage |

**Build**
- [ ] Persist the cart across restarts, handling hydration properly (no flash of an empty cart; see the Exercise 13 gotcha)
- [ ] Store todos in **SQLite**: create a table, run migrations with `PRAGMA user_version`, and implement CRUD
- [ ] Make the product list **work offline**: cache the last response and show an "Offline, showing cached data" banner (builds on Exercise 20)
- [ ] Queue "add to cart" API calls while offline and replay them when back online

### 4.5 Forms
**Learn:** `react-hook-form` + `zod` (`zodResolver`), `Controller` for RN inputs, field-level errors, focus chaining with refs (`returnKeyType="next"`), `autoComplete` / `textContentType` for autofill, and keyboard dismissal.

**Build**
- [ ] A **checkout form**: name, email, phone, address, postcode, card-number mask. Validate on blur, show errors inline, and pressing "next" on the keyboard should move to the next field.
- [ ] Finish Exercise 5's submit button using this approach, and compare the code size

**Interview check**
- Server state vs client state: why treat them differently?
- Redux vs Context vs Zustand: when would you choose each?
- Where do you store an auth token and why *not* AsyncStorage?
- How would you design offline support for a shopping cart?

---

## Phase 5 — Animation & Gestures (Weeks 12–13)

### 5.1 Built-in Animated API (know it, but don't depend on it)
- [ ] Fade + slide a toast in and out with `Animated.timing`, using `useNativeDriver: true`. Understand which properties the native driver supports (transform and opacity, but not layout).

### 5.2 Reanimated
**Learn:** shared values (`useSharedValue`), `useAnimatedStyle`, `withTiming`/`withSpring`/`withSequence`/`withRepeat`, **worklets** and the UI thread, `runOnJS`/`scheduleOnRN`, `interpolate`, layout animations (`entering`/`exiting`/`LinearTransition`), scroll-driven animations (`useAnimatedScrollHandler`).

**Build**
- [ ] Rebuild Exercise 19 with Reanimated
- [ ] **"Fly to cart"** animation: when tapping "Add to cart", a dot animates from the button to the basket icon, and the basket "bounces"
- [ ] Animated cart badge count (scale pop on change)
- [ ] Cart items animate in and out with layout animations when added or removed
- [ ] Collapsing header on the product detail screen driven by scroll position

### 5.3 Gesture Handler
**Learn:** `GestureDetector`, `Gesture.Pan/Tap/LongPress/Pinch`, composing gestures (`Simultaneous`, `Exclusive`), and integrating with Reanimated.

**Build**
- [ ] **Swipe-to-delete** on cart items, with a haptic at the threshold (`expo-haptics`)
- [ ] Pinch-to-zoom + double-tap-to-zoom on the product image
- [ ] A draggable **bottom sheet** for product filters, built from scratch first and then with `@gorhom/bottom-sheet`. Compare the two.

**Interview check**
- Why do JS-thread animations jank, and how does Reanimated avoid it?
- What's a worklet?
- How do you hand control back from the UI thread to JS?

---

## Phase 6 — Device & Native Features (Weeks 14–16)

### 6.0 The permission pattern (learn this once, apply it everywhere)
Each native feature follows the same lifecycle. Build a reusable `PermissionGate` component or `usePermission` hook around it:

```
undetermined ──request──► granted ──► use the feature
     │                       
     └──────────► denied ──(canAskAgain?)──► yes: explain the value, then request again
                                    └──────► no: explain, then Linking.openSettings()
```
- Ask **in context** (at the moment the user needs the feature), not on app launch
- iOS needs usage-description strings (`NSCameraUsageDescription` etc.), set via config plugins in `app.json`
- Android 13+ has granular media permissions and a runtime notification permission
- Re-check permissions when the app returns to the foreground. The user may have changed them in Settings.

### 6.1 Camera & media
**Learn:** `expo-camera` (`CameraView`, `useCameraPermissions`, `takePictureAsync`, `recordAsync`, `barcodeScannerSettings` + `onBarcodeScanned`), `expo-image-picker` (gallery and quick camera), `expo-media-library` (saving to the camera roll), `expo-image-manipulator` (resize/compress before upload).

**Build**
- [ ] **Barcode scanner**: give each product a barcode, scan it, and add the product to the cart (with a haptic and a success sound). Debounce so one scan doesn't add the item 10 times.
- [ ] **Product review with a photo**: take a photo *or* pick from the gallery, show a preview, compress to under 500 KB, and "upload" it (POST multipart to a test endpoint such as httpbin.org)
- [ ] Pause the camera when the screen loses focus or the app goes to the background (`useIsFocused` + Exercise 40)
- [ ] Profile avatar: crop to a square and persist the file with `expo-file-system`

### 6.2 Location & maps
**Learn:** `expo-location` (`useForegroundPermissions`, `getCurrentPositionAsync`, `getLastKnownPositionAsync`, `watchPositionAsync`, `reverseGeocodeAsync`, accuracy levels and battery trade-offs), background location + geofencing with `TaskManager.defineTask` (dev build required on iOS), maps with `react-native-maps` or `expo-maps`.

**Build**
- [ ] **Store finder** screen: a map with markers for fake store locations, the user's location, the nearest store highlighted, and the distance to each store (Haversine formula)
- [ ] Auto-fill the checkout address with `reverseGeocodeAsync`
- [ ] Live-tracking "delivery driver" demo with `watchPositionAsync` (simulate movement in the simulator: Features → Location → City Run)
- [ ] Stretch: geofence notification "You're near a Mini-Mart store!" (needs a dev build + background permission)

### 6.3 Notifications
**Learn:** `expo-notifications`: permissions, `setNotificationHandler` (foreground presentation), `scheduleNotificationAsync` (local; time, date and repeating triggers), Android notification channels, `addNotificationReceivedListener` / `addNotificationResponseReceivedListener` (tap → navigate), push tokens (`getExpoPushTokenAsync`), the Expo push service vs FCM/APNs direct. **Remote push needs a dev build.** Local notifications work in Expo Go.

**Build**
- [ ] "You left items in your cart" local notification 1 hour after backgrounding with a non-empty cart. Cancel it if the user returns.
- [ ] Tapping a notification deep-links to the cart (including when the app was **killed**, using `getLastNotificationResponse`)
- [ ] Send yourself a real push via the Expo push tool from a dev build on a physical device
- [ ] Set the app icon badge count to match the number of cart items

### 6.4 Everything else a modern app touches
Do each as a small, self-contained feature:
- [ ] **Biometrics** (`expo-local-authentication`): Face ID / fingerprint to confirm checkout, with a passcode fallback
- [ ] **Haptics** (`expo-haptics`) on add-to-cart, errors and success
- [ ] **Share** a product (`Share` from RN, or `expo-sharing` for files)
- [ ] **Clipboard** (`expo-clipboard`): copy a discount code
- [ ] **Linking**: open a phone number, email, maps directions, app settings
- [ ] **In-app browser** (`expo-web-browser`) for T&Cs
- [ ] **Sensors** (`expo-sensors`): shake-to-undo the last cart action (Accelerometer)
- [ ] **Device info** (`expo-device`, `expo-application`, `expo-constants`): an "About" screen with app version, build number, OS and model
- [ ] **Network** (`expo-network` / NetInfo): offline banner (from Phase 4)
- [ ] **Audio/Video** (`expo-audio`, `expo-video`): a product video on the detail screen
- [ ] **Screen orientation** (`expo-screen-orientation`): lock the scanner to portrait
- [ ] **Keep awake** (`expo-keep-awake`) while scanning
- [ ] **Store review prompt** (`expo-store-review`) after the 3rd successful order
- [ ] **Background tasks** (`expo-background-task`): refresh product prices periodically and understand the OS limits on how often this runs
- [ ] **Calendar/Contacts**: add a "Delivery slot" event to the calendar
- [ ] **Home-screen widget / Live Activity** (`expo-widgets`): stretch goal, an "order status" widget

**Interview check**
- Walk through the permission lifecycle and the differences between iOS and Android
- What's the difference between local and push notifications, and how does push delivery work (APNs/FCM, tokens)?
- How do you handle a notification tap when the app is killed vs backgrounded vs foregrounded?
- How would you save battery in a location-tracking app?
- Why can't you just do background work whenever you want on iOS?

---

## Phase 7 — Native Modules & Config Plugins (Week 17)

This is what separates "React Native developer" from "JS developer who uses React Native". Your Flutter platform-channel experience applies directly here.

**Learn**
- **Expo Modules API**: write native modules in Swift and Kotlin with a declarative DSL (`Name`, `Function`, `AsyncFunction`, `Events`, `View`)
- Turbo Modules + Codegen (the RN-core way): know what they are, even if you use Expo Modules
- **Config plugins**: modify `Info.plist`, `AndroidManifest.xml`, Gradle and Podfile at prebuild time
- When to write native code vs finding a library

**Build**
- [ ] `npx create-expo-module --local` → a `DeviceInsights` module exposing:
  - a sync function (e.g. `getThermalState()` on iOS / battery temperature on Android)
  - an async function
  - an event emitter (e.g. "thermal state changed") consumed by a hook
- [ ] A native **view** component (e.g. a native `UIDatePicker` / Android equivalent, or a blur view)
- [ ] Write a tiny config plugin that adds a custom `Info.plist` key, and verify it after `prebuild`

**Interview check**
- How do JS and native communicate in the New Architecture?
- How would you integrate an SDK that only has a native iOS/Android library?
- What is a config plugin and why does it matter for CNG?

---

## Phase 8 — Quality: Testing, Performance, Accessibility, i18n (Weeks 18–19)

### 8.1 Testing
**Learn:** Jest with the `jest-expo` preset; **React Native Testing Library** (`render`, `screen.getByRole/getByText`, `fireEvent`/`userEvent`, `waitFor`, `findBy*`), testing *behaviour* rather than implementation, mocking native modules (`jest.mock('expo-location')`), mocking network calls with **MSW**, testing Redux reducers and selectors as pure functions, testing hooks with `renderHook`. E2E with **Maestro** (YAML flows; supported by EAS Workflows) or Detox.

**Build**
- [ ] Unit tests for `cartSlice` (add/remove/delete/clear and edge cases)
- [ ] Unit tests for `useDebounce` and `useFetch` (fake timers!)
- [ ] Component tests: `ProductCard` calls `onAddToCart`; `CartScreen` shows the correct total; the checkout form shows validation errors
- [ ] Integration test: render the app with the store, add 2 items, navigate to the cart, and assert the total
- [ ] A Maestro flow: launch → add product → open cart → checkout
- [ ] GitHub Actions: run `tsc --noEmit`, ESLint and Jest on every PR

### 8.2 Performance
**Learn**
- Tools: Perf Monitor, **React DevTools Profiler** (via the Expo dev tools / `j` in the Metro terminal), "Highlight updates when components render", Hermes CPU profiles, Xcode Instruments / Android Studio Profiler for native
- Common causes: unnecessary re-renders, inline objects and functions passed to memoized children, heavy `renderItem`, large unoptimised images, too much work on the JS thread at startup, a `console.log` storm, context value churn
- Startup: fewer imports at launch, lazy screens, `expo-splash-screen` control, bundle size analysis with **Expo Atlas** (`EXPO_ATLAS=1 npx expo start`)
- Memory leaks: forgotten subscriptions, timers, and closures holding big objects

**Build**
- [ ] Profile the 5,000-item product list, find the 3 biggest wins, and document before/after numbers in a `PERFORMANCE.md`
- [ ] Turn on React Compiler and measure the difference
- [ ] Analyse the bundle with Expo Atlas and remove one heavy dependency or import

### 8.3 Accessibility
**Learn:** `accessible`, `accessibilityLabel`, `accessibilityHint`, `accessibilityRole`, `accessibilityState`, `accessibilityValue` (and the newer `aria-*`/`role` props), `importantForAccessibility`, focus order, minimum 44×44pt touch targets, `allowFontScaling` and Dynamic Type, colour contrast, reduced motion (`AccessibilityInfo.isReduceMotionEnabled` / Reanimated's `useReducedMotion`).

**Build**
- [ ] Navigate the whole shop using **VoiceOver** (iOS) and **TalkBack** (Android) only, and fix everything that's confusing. For example, the "+"/"-" icon buttons in Exercise 1 currently have no labels.
- [ ] Test at the largest accessibility font size, and fix any truncated or overlapping text
- [ ] Respect reduced motion in your Phase 5 animations

### 8.4 Internationalisation
**Learn:** `expo-localization`, `i18next` + `react-i18next` (or `lingui`), `Intl.NumberFormat` / `Intl.DateTimeFormat`, pluralisation, RTL layouts (`I18nManager`, `start`/`end` instead of `left`/`right`).

**Build**
- [ ] Replace hard-coded `£${price.toFixed(2)}` with `Intl.NumberFormat(locale, { style: 'currency', currency })`
- [ ] Translate the app into one more language, and make sure pluralisation works ("1 item" / "2 items")
- [ ] Turn on RTL and fix the layout issues

**Interview check**
- How do you find and fix a slow screen? Walk through your process.
- What do you unit test vs integration test vs E2E test in a mobile app?
- How do you make a custom button accessible?

---

## Phase 9 — Ship It: Builds, Releases & Operations (Week 20)

**Learn**
- **EAS Build**: `eas.json` profiles (development / preview / production), credentials and code signing (EAS can manage these for you), internal distribution (ad hoc / APK) for testers
- **App config**: move from `app.json` to `app.config.ts` for environment-dependent values. Use `EXPO_PUBLIC_*` env vars, and remember they're **embedded in the bundle, so never put secrets there**. Also know about EAS environment variables and secrets.
- **Versioning**: `version` vs `ios.buildNumber` / `android.versionCode`, and `autoIncrement`
- **EAS Submit**: TestFlight and Play Console internal testing
- **EAS Update / `expo-updates`**: OTA JS updates, channels and branches, `runtimeVersion` policies (what happens if native code changed?), rollouts, rollbacks, and checking for updates on launch
- **Monitoring**: crash and error reporting (Sentry with source maps), analytics, logging
- **CI/CD**: EAS Workflows or GitHub Actions running `eas build`, then a Maestro E2E run, then `eas submit`
- Store requirements: privacy manifests (iOS), data-safety form (Android), App Tracking Transparency (`expo-tracking-transparency`), Sign in with Apple rules, review guidelines

**Build**
- [ ] Rename `bundleIdentifier` from `com.anonymous.mini-shop` to your own reverse domain
- [ ] Configure `eas.json` with 3 profiles and build a **preview** build to install on your own phone
- [ ] Have separate app icons and names per environment ("Mini-Mart (Dev)") via `app.config.ts`
- [ ] Publish an OTA update that changes some text, and watch it arrive on the preview build
- [ ] Integrate Sentry, trigger a test crash, and confirm you get a readable stack trace
- [ ] Optional: ship to TestFlight / Play internal testing

**Interview check**
- How do OTA updates work and what are their limits? When must you ship a new binary?
- How do you manage environments (dev/staging/prod) in an Expo app?
- What does your release process look like, end to end?

---

## Phase 10 — Capstone & Interview Prep (Ongoing)

### 10.1 Capstone definition of done
By now `mini-shop` should be a credible portfolio app. Check off:
- [ ] Auth (login, secure token, protected routes, logout)
- [ ] Product catalogue from an API with search, infinite scroll and offline cache
- [ ] Product detail with images, video, pinch-zoom and share
- [ ] Cart persisted across restarts, with animations, swipe-to-delete and a badge
- [ ] Checkout form with validation, address autofill from GPS, and biometric confirm
- [ ] Barcode scanning to add products
- [ ] Store finder map
- [ ] Local + push notifications with deep linking
- [ ] Dark mode, accessibility pass, one extra language
- [ ] Tests (unit + component + 1 E2E flow) in CI
- [ ] Preview build on your phone; OTA update demonstrated
- [ ] README with screenshots/GIFs, architecture diagram, and "decisions & trade-offs" section

### 10.2 Interview question bank
Practice answering these **out loud**. Record yourself if you can.

**React fundamentals**
1. Explain the React render cycle: render phase vs commit phase.
2. What's reconciliation, and how do keys help?
3. Controlled vs uncontrolled inputs?
4. When would you use `useReducer` over `useState`?
5. What is a custom hook? Give an example you've written.
6. Explain `useEffect` cleanup with a real bug it prevents.
7. What does React Compiler do? Does it make `useMemo` obsolete?
8. What are Suspense and error boundaries?

**React Native specifics**
9. How does RN render native UI? Old bridge vs New Architecture (JSI, Fabric, Turbo Modules).
10. What is Hermes and why does it improve startup time?
11. How do you optimise a long list?
12. How do you handle different screen sizes and safe areas / notches?
13. Expo vs bare React Native in 2026: is "bare" still a thing? (CNG changed this debate.)
14. How do you debug a crash that only happens in production on Android?
15. How do you handle app lifecycle (background/foreground)?
16. How do you implement deep linking + push notification navigation?

**Architecture & state**
17. How would you structure a large RN app?
18. Redux vs Zustand vs Context vs TanStack Query: choose and justify.
19. How do you design offline-first sync? (conflicts, queues, retries)
20. How do you secure an RN app? (token storage, SSL pinning, obfuscation limits, no secrets in the bundle, jailbreak detection trade-offs)

**Flutter comparison** (you *will* get these, and your background is an asset)
21. Flutter vs React Native: honest pros and cons of each.
22. What did you have to unlearn coming from Flutter?
23. How does `setState` in Flutter differ from `useState` in React?

**Mobile system design** (senior roles)
24. Design an offline-capable shopping app with a cart that syncs across devices.
25. Design the image feed for an Instagram-style app (caching, pagination, prefetch, memory).
26. Design a chat app (real-time with WebSockets, message ordering, optimistic send, push when backgrounded).
27. Design a ride-tracking screen (location updates, battery, map rendering, background behaviour).

### 10.3 Live-coding drills (timebox: 30–45 minutes each)
Interviewers commonly ask you to build one of these from scratch with no libraries:
- [ ] Searchable, debounced list fetched from an API with loading/error/empty states
- [ ] Infinite scroll feed with pull-to-refresh
- [ ] Todo app with add/toggle/delete/filter and persistence
- [ ] Stopwatch with laps
- [ ] Image carousel with pagination dots
- [ ] Star rating component (accessible!)
- [ ] OTP / PIN input with auto-advance between boxes
- [ ] Accordion / expandable FAQ list with animation
- [ ] Tic-tac-toe or a memory card game (state modelling)
- [ ] Form with validation and a submit loading state

Repeat 2–3 of them a week later and aim to be faster and cleaner each time.

---

## Resources

**Official (prioritise these)**
- React docs: https://react.dev/learn (do the whole "Learn" section)
- React Native docs: https://reactnative.dev/docs/getting-started
- Expo docs (SDK 57): https://docs.expo.dev/versions/v57.0.0/
- Expo guides: https://docs.expo.dev/guides/overview/
- React Navigation: https://reactnavigation.org
- Reanimated: https://docs.swmansion.com/react-native-reanimated/
- Gesture Handler: https://docs.swmansion.com/react-native-gesture-handler/
- TanStack Query: https://tanstack.com/query/latest
- Redux Toolkit: https://redux-toolkit.js.org
- React Native Testing Library: https://callstack.github.io/react-native-testing-library/

**Worth following**
- Expo blog and changelog (release notes for each SDK)
- React Native blog (release notes and New Architecture posts)
- Software Mansion and Callstack blogs (performance, animations)
- *This Week in React* newsletter

---

## Progress Tracker

| Phase | Started | Completed | Notes |
|---|---|---|---|
| 0 — Orientation | | | |
| 1 — React core | | | |
| 2 — UI | | | |
| 3 — Navigation | | | |
| 4 — State & data | | | |
| 5 — Animation | | | |
| 6 — Device features | | | |
| 7 — Native modules | | | |
| 8 — Quality | | | |
| 9 — Ship it | | | |
| 10 — Capstone | | | |
