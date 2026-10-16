# React Native Training Plan: Flutter Dev → Production-Ready RN Engineer

A structured plan to go from "I know Flutter" to "I can build, ship and defend a React Native app in an interview".

**Stack targeted:** Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript · New Architecture
**Docs to trust:** https://docs.expo.dev/versions/v57.0.0/ · https://react.dev · https://reactnative.dev
**Version note (Oct 2026):** SDK 58 (RN 0.88, React 19.3) is now the latest Expo release. Stay on SDK 57 while you learn, then do the upgrade as a deliberate exercise in Phase 9. Upgrading an app is a real-world skill interviewers ask about.
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
- **How to study a module:** read the pages under **Read** first (about 1–2 hours), then do the **Build** tasks with the docs open, then answer the **Interview check** questions out loud without notes. Reading without building won't stick, and building without reading leaves gaps.
- **Trust order for sources:** official docs (react.dev, reactnative.dev, docs.expo.dev) → each library's own docs → the handful of blogs linked below. Be wary of tutorials and videos from before late 2024: they usually show the old architecture, class components or Expo patterns that have since changed.
- **Warm-up (optional, ~1 day):** the official [Expo tutorial](https://docs.expo.dev/tutorial/introduction/) builds a small app end to end and touches most of Phases 0–3.
- Commit after every module, using a branch per phase if you like. Your git history becomes evidence of the journey.
- Suggested pace: **~8–10 hrs/week → ~23 weeks**. Phases 0–3 are the foundation. Don't rush them.

| Phase | Theme | Est. weeks |
|---|---|---|
| 0 | Orientation & mental model | 1 |
| 1 | React core (hooks): see [EXERCISES.md](EXERCISES.md) | 3 |
| 2 | UI: layout, styling, components, lists | 2 |
| 3 | Navigation, auth (incl. social sign-in) & app architecture | 2.5 |
| 4 | State & data: Redux, server state, persistence, forms, real-time | 3.5 |
| 5 | Animation & gestures | 2 |
| 6 | Device & native features, payments | 4 |
| 7 | Native modules & config plugins | 1 |
| 8 | Quality: testing, performance, accessibility, i18n, security | 2.5 |
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

**Read**
- [Architecture overview](https://reactnative.dev/architecture/overview), then [Render, Commit, and Mount](https://reactnative.dev/architecture/render-pipeline) and [Threading Model](https://reactnative.dev/architecture/threading-model). Together these answer the "Done when" diagram.
- [The New Architecture is here](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here) (blog post explaining *why* the bridge was replaced)
- [Hermes](https://reactnative.dev/docs/hermes) and [Metro](https://reactnative.dev/docs/metro)
- [New Architecture in Expo](https://docs.expo.dev/guides/new-architecture/)

**Flutter lens:** Flutter paints every pixel with its own engine (Skia/Impeller). RN renders **real native views** (`UIView`, `android.view.View`). That's why RN apps "feel native" for free, and also why iOS and Android can look slightly different.

**Done when:** you can draw a diagram showing what happens between `<Text>Hello</Text>` in JS and pixels on screen.

### 0.2 Expo, workflows and builds
**Learn**
- Expo Go vs **development builds** (`expo-dev-client`). Expo Go is a sandbox with a fixed set of native modules. As soon as you need a custom native library, push notifications on Android, background location on iOS, and so on, you need a dev build.
- **Continuous Native Generation (CNG)** / `npx expo prebuild`: `ios/` and `android/` folders are *generated* from `app.json` + config plugins. Treat them as build artifacts.
- `npx expo install <pkg>` vs `npm install`: the former picks the version compatible with your SDK.
- `npx expo-doctor`: health check for your dependency versions.

**Read**
- [Core concepts](https://docs.expo.dev/core-concepts/) (the Expo mental model in one page)
- [Development builds: introduction](https://docs.expo.dev/develop/development-builds/introduction/)
- [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)
- [Using libraries](https://docs.expo.dev/workflow/using-libraries/) (why `npx expo install`)
- [Expo CLI reference](https://docs.expo.dev/more/expo-cli/)

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

**Read**
- JavaScript refresher: [javascript.info](https://javascript.info/). Skim Part 1, and read the Promises/async and Modules chapters properly.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) (Everyday Types, Narrowing, Generics)
- [Using TypeScript with React](https://react.dev/learn/typescript) and the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript in Expo](https://docs.expo.dev/guides/typescript/) and [Zod](https://zod.dev/)

**Flutter lens:** Dart is nominal, sound and null-safe. TS is **structural** and its types are erased at runtime, so validate external data (API responses) with a schema library such as Zod.

**Build**
- [ ] Add typed Redux hooks: `RootState`, `AppDispatch`, `useAppSelector`, `useAppDispatch` in `store/`, and replace the inline `(state: { cart: ... })` selector types in `CartScreen`/`TodoScreen`
- [ ] Type the reducer actions in `cartSlice.ts` with `PayloadAction<...>` (currently `action` is untyped in `addItem`/`removeItem`)
- [ ] Enable `"strict": true` in `tsconfig.json` if it isn't already, and fix the errors

---

## Phase 1 — React Core (Weeks 2–4)

→ Complete **[EXERCISES.md](EXERCISES.md) Parts 1–7**.

In addition, read these react.dev pages. They're short and come up constantly in interviews:
- [ ] [Thinking in React](https://react.dev/learn/thinking-in-react)
- [ ] [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [ ] [Render and Commit](https://react.dev/learn/render-and-commit)
- [ ] [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [ ] [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [ ] [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state) (this is where `key` matters)
- [ ] [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) ⭐
- [ ] [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) / [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects) / [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects) (covers `useEffectEvent`)
- [ ] [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [ ] [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context) and [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) (for Part 7)
- [ ] [React Compiler introduction](https://react.dev/learn/react-compiler/introduction) and [React Compiler in Expo](https://docs.expo.dev/guides/react-compiler/)
- [ ] Optional deep dive: Dan Abramov's [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/). It's from the class-to-hooks era, but the mental model is still the best explanation of effects and stale closures.

Best way to read these: do the whole react.dev **Learn** section in order once (it's the single best React resource), then come back to these pages as you hit the matching exercises.

**Also cover**
- **Component composition:** `children`, render props, compound components (`<Card><Card.Header/></Card>`)
- **Controlled vs uncontrolled** components
- **Lifting state up** vs context vs store: the decision tree
- **Error boundaries** (still class components, or use `react-error-boundary`). Expo Router has its own `ErrorBoundary` export.
- **Suspense** and `use()` (React 19) at a conceptual level
- **`useTransition` / `useDeferredValue`**: keep typing responsive while a big list filters

**Read (for "Also cover")**
- [`Suspense`](https://react.dev/reference/react/Suspense), [`use`](https://react.dev/reference/react/use), [`useTransition`](https://react.dev/reference/react/useTransition), [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue), [`StrictMode`](https://react.dev/reference/react/StrictMode)
- [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) and [Expo Router error handling](https://docs.expo.dev/router/error-handling/)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) (lifting state up)

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

**Read**
- [Layout with Flexbox](https://reactnative.dev/docs/flexbox) (do every interactive example) and [Height and Width](https://reactnative.dev/docs/height-and-width)
- [Layout props reference](https://reactnative.dev/docs/layout-props)
- [Yoga playground](https://www.yogalayout.dev/playground) for experimenting without rebuilding the app
- [Safe areas](https://docs.expo.dev/develop/user-interface/safe-areas/)

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

**Read**
- [Style](https://reactnative.dev/docs/style), [StyleSheet](https://reactnative.dev/docs/stylesheet), [View style props](https://reactnative.dev/docs/view-style-props) (includes `boxShadow`)
- [Platform-specific code](https://reactnative.dev/docs/platform-specific-code)
- [Color themes](https://docs.expo.dev/develop/user-interface/color-themes/), [Fonts](https://docs.expo.dev/develop/user-interface/fonts/), [Icons](https://docs.expo.dev/guides/icons/)
- [Tailwind / NativeWind in Expo](https://docs.expo.dev/guides/tailwind/) if you want to try a styling library

**Build**
- [ ] Create a `theme/` folder with design tokens (colours, spacing, radii, typography) for light and dark
- [ ] Build a small component library in `components/ui/`: `Button` (variants: primary/secondary/destructive, loading, disabled), `Card`, `Text` (variants: title/body/caption), `Input`, `Badge`. Then replace the duplicated red-button styles across `CartScreen`, `ProductsScreen` and `TodoScreen` with `<Button>`.
- [ ] Add a custom font across the app
- [ ] Support system dark mode plus an in-app override (builds on Exercise 36)

### 2.3 Core components
**Learn & use each at least once:** `View`, `Text` (`numberOfLines`, `ellipsizeMode`, nesting), `Image` vs **`expo-image`** (caching, placeholders, blurhash, transitions), `ScrollView`, `Pressable` (with `pressed` state, `hitSlop`, `android_ripple`), `TextInput` (`keyboardType`, `secureTextEntry`, `autoComplete`, `returnKeyType`, `onSubmitEditing`), `Switch`, `ActivityIndicator`, `Modal`, `RefreshControl`, `KeyboardAvoidingView`, `StatusBar`, `ImageBackground`.

**Read**
- [Core components and APIs](https://reactnative.dev/docs/components-and-apis) (skim the whole list once), then [Text](https://reactnative.dev/docs/text), [TextInput](https://reactnative.dev/docs/textinput), [Pressable](https://reactnative.dev/docs/pressable)
- [`expo-image`](https://docs.expo.dev/versions/v57.0.0/sdk/image/)
- [Keyboard handling](https://docs.expo.dev/guides/keyboard-handling/) (compares `KeyboardAvoidingView` and `react-native-keyboard-controller`)

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

**Read**
- [FlatList](https://reactnative.dev/docs/flatlist), [SectionList](https://reactnative.dev/docs/sectionlist), [VirtualizedList](https://reactnative.dev/docs/virtualizedlist)
- [Optimizing FlatList configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration) ⭐ (interview material)
- [FlashList docs](https://shopify.github.io/flash-list/), especially the pages on how recycling works and performance

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

## Phase 3 — Navigation, Auth & App Architecture (Weeks 7–9)

### 3.1 React Navigation (what you have now)
**Learn:** stack, tabs, drawer, nested navigators, `navigation.navigate/push/goBack/popToTop/replace`, route params, **typed navigation** (`RootStackParamList`, `NativeStackScreenProps`), header options, `useFocusEffect`, `useIsFocused`, modals (`presentation: 'modal' | 'formSheet'`), `navigation.setOptions` for dynamic headers.

**Read**
- [React Navigation: Getting started](https://reactnavigation.org/docs/getting-started), then the Fundamentals section in order
- [Type checking with TypeScript](https://reactnavigation.org/docs/typescript)
- [Nesting navigators](https://reactnavigation.org/docs/nesting-navigators) and [Navigation lifecycle](https://reactnavigation.org/docs/navigation-lifecycle) (`useFocusEffect`)

**Build**
- [ ] Pass `productId` as a param to the new Product Detail screen, with full typing
- [ ] Show a cart-count badge on the Shop tab (`tabBarBadge`) driven by Redux
- [ ] Open the cart as a modal / form sheet from anywhere
- [ ] Use `useFocusEffect` to refresh data when a tab gains focus

### 3.2 Expo Router (the Expo default for new apps)
**Learn:** file-based routes in `app/`, `_layout.tsx`, `(groups)`, dynamic routes `[id].tsx`, `useLocalSearchParams`, `<Link>`, `router.push`, typed routes, `+not-found`, protected routes / redirects, **native tabs**, deep linking for free.

**Read**
- [Introduction to Expo Router](https://docs.expo.dev/router/introduction/), [Core concepts](https://docs.expo.dev/router/basics/core-concepts/), [Notation](https://docs.expo.dev/router/basics/notation/), [Navigation layouts](https://docs.expo.dev/router/basics/navigation-layouts/)
- [Common navigation patterns](https://docs.expo.dev/router/basics/common-navigation-patterns/) (matches the target structure below)
- [Protected routes](https://docs.expo.dev/router/advanced/protected/), [Modals](https://docs.expo.dev/router/advanced/modals/), [Native tabs](https://docs.expo.dev/router/advanced/native-tabs/), [Typed routes](https://docs.expo.dev/router/reference/typed-routes/)
- [Migrating from React Navigation](https://docs.expo.dev/router/migrate/from-react-navigation/)

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
**Read**
- [Linking overview](https://docs.expo.dev/linking/overview/), [Linking into your app](https://docs.expo.dev/linking/into-your-app/), [iOS Universal Links](https://docs.expo.dev/linking/ios-universal-links/), [Android App Links](https://docs.expo.dev/linking/android-app-links/)
- [Authentication in Expo Router](https://docs.expo.dev/router/advanced/authentication/) (the splash-screen-without-flash pattern)
- [`expo-secure-store`](https://docs.expo.dev/versions/v57.0.0/sdk/securestore/)

**Build**
- [ ] Set a `scheme` in `app.json` (e.g. `minishop`) and make `minishop://product/3` open product 3. Test it with `npx uri-scheme open minishop://product/3 --ios`.
- [ ] Build a fake **auth flow**: a login screen, a token in `expo-secure-store`, an authenticated group of screens, and a redirect to login when logged out. The "splash while checking the token" state must not flash the login screen.
- [ ] Learn the difference between a custom scheme and **Universal Links / App Links**, and what `apple-app-site-association` / `assetlinks.json` are

### 3.4 Real authentication: OAuth & social sign-in
The fake auth flow above teaches routing. Real apps sign users in with an identity provider, and that brings in browser redirects, tokens that expire, and store rules.

**Learn**
- **OAuth 2.0 + PKCE** for mobile: why a mobile app is a "public client" that can't hold a client secret, and how PKCE (code verifier / code challenge) replaces it
- `expo-auth-session` (`useAuthRequest`, `makeRedirectUri`, discovery documents) and `expo-web-browser` (`maybeCompleteAuthSession`)
- **Sign in with Apple** (`expo-apple-authentication`) and **Google sign-in** (`@react-native-google-signin/google-signin`, which uses the native Credential Manager on Android)
- **Apple's rule:** if you offer a third-party social login, you must also offer Sign in with Apple (or an equivalent privacy-focused option). This is a classic review rejection.
- Access tokens vs refresh tokens; refreshing silently before expiry; what to do when the refresh token is revoked
- Managed auth services worth recognising: Firebase Auth, Supabase Auth, Clerk, Auth0, Amazon Cognito

**Read**
- [Authentication overview](https://docs.expo.dev/develop/authentication/) and [Authentication with OAuth / AuthSession](https://docs.expo.dev/guides/authentication/)
- [`expo-auth-session`](https://docs.expo.dev/versions/v57.0.0/sdk/auth-session/), [`expo-apple-authentication`](https://docs.expo.dev/versions/v57.0.0/sdk/apple-authentication/), [Google authentication](https://docs.expo.dev/guides/google-authentication/)
- [PKCE explained](https://oauth.net/2/pkce/) and, for depth, [RFC 8252: OAuth 2.0 for Native Apps](https://www.rfc-editor.org/rfc/rfc8252)
- App Store Review Guidelines, [section 4.8 (Login Services)](https://developer.apple.com/app-store/review/guidelines/#login-services)
- Pick one provider and read its Expo guide: [Supabase](https://docs.expo.dev/guides/using-supabase/), [Clerk](https://docs.expo.dev/guides/using-clerk/) or [Firebase](https://docs.expo.dev/guides/using-firebase/)

**Flutter lens:** the same as `flutter_appauth` / `google_sign_in` / `sign_in_with_apple`. The concepts are identical. Only the packages change.

**Build**
- [ ] Replace the fake login with a real provider. Free tiers of Supabase, Clerk or Auth0 all work. Keep the token in `expo-secure-store`.
- [ ] Add **Sign in with Apple** (iOS) and **Google sign-in** (both platforms). Note which parts need a dev build.
- [ ] An API client wrapper (a `fetch` wrapper or Axios interceptor) that attaches the access token, refreshes it on a `401`, retries the request once, and logs the user out if the refresh fails. Make sure several requests that fail at the same time trigger **only one** refresh.
- [ ] A "Delete my account" flow. Apple requires in-app account deletion for any app that lets users create an account.

### 3.5 Project structure
**Learn:** feature folders vs type folders, barrel files (and their downsides), path aliases (`@/components`) via `tsconfig` paths, and a constants/env strategy.

**Read**
- [Path aliases in Expo](https://docs.expo.dev/guides/typescript/) (the "Path aliases" section) and [the `src` directory](https://docs.expo.dev/router/reference/src-directory/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react), a well-known example of feature-folder architecture (written for web React, but the structure carries over)

**Build**
- [ ] Restructure into feature folders: `features/cart`, `features/products`, `features/todo`, each owning its components, slice, hooks and tests
- [ ] Add the `@/` path alias

**Interview check**
- How does deep linking work end-to-end on iOS and on Android?
- How would you structure navigation for an app that has onboarding, auth, and a main tabbed area?
- How do you pass data between screens, and what *shouldn't* you put in route params?
- Walk through OAuth with PKCE on mobile. Why can't a mobile app keep a client secret?
- How do you refresh tokens without a race when five requests get a `401` at once?

---

## Phase 4 — State, Data, Persistence & Real-Time (Weeks 10–12)

### 4.1 Client state: Redux Toolkit properly
You already have slices. Now do it the way a production codebase would.

**Learn:** `configureStore`, typed hooks, `createSelector` (memoized selectors), `createEntityAdapter` (normalised state), `createAsyncThunk`, middleware, Immer (and why mutation works inside `createSlice`), Redux DevTools.

**Read**
- [Redux Essentials, Part 1](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) onwards. Work through the whole Essentials tutorial; it teaches RTK the modern way.
- [TypeScript quick start](https://redux-toolkit.js.org/tutorials/typescript) (typed hooks)
- [Deriving data with selectors](https://redux.js.org/usage/deriving-data-selectors), [`createEntityAdapter`](https://redux-toolkit.js.org/api/createEntityAdapter), [`createListenerMiddleware`](https://redux-toolkit.js.org/api/createListenerMiddleware)

**Build**
- [ ] Move `getCartTotal` from `CartScreen` into a memoized selector `selectCartTotal`, plus `selectCartCount`
- [ ] Convert the cart to `createEntityAdapter`
- [ ] Write a listener middleware that logs analytics events on `addItem`
- [ ] Hook up Redux DevTools (via the Expo dev tools plugin or Reactotron)

### 4.2 Alternatives you should be able to discuss
- [ ] Re-implement the **todo** feature with **Zustand** (on a branch, ~30 minutes). Compare boilerplate, re-render behaviour (selectors), and devtools.
- Know what **Jotai** (atoms) and **Legend State** / **MobX** (observables) are, at a sentence level

**Read:** [Zustand docs](https://zustand.docs.pmnd.rs/) (Getting started + "Prevent rerenders with useShallow"), [Jotai](https://jotai.org/), [Legend State](https://legendapp.com/open-source/state/)

### 4.3 Server state: TanStack Query
**Learn:** why server state ≠ client state; `useQuery`, `useMutation`, query keys, `staleTime` vs `gcTime`, invalidation, `useInfiniteQuery`, optimistic updates, retries, `refetchOnWindowFocus` → `focusManager` + `AppState` in RN, `onlineManager` + NetInfo. Also know **RTK Query** exists, since you're already on RTK.

**Read**
- [TanStack Query overview](https://tanstack.com/query/latest/docs/framework/react/overview), then the Guides & Concepts pages on Queries, Query Keys, Mutations, Invalidation, Infinite Queries and Optimistic Updates
- [TanStack Query in React Native](https://tanstack.com/query/latest/docs/framework/react/react-native) (`focusManager` / `onlineManager`)
- TkDodo's [Practical React Query](https://tkdodo.eu/blog/practical-react-query) series. He maintains the library, and this is the best explanation of *how* to use it well.

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

**Read**
- [Store data](https://docs.expo.dev/develop/user-interface/store-data/) (Expo's comparison of storage options)
- [`expo-sqlite`](https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/) (including the `kv-store` section) and [Database options](https://docs.expo.dev/develop/database/)
- [Local-first architecture](https://docs.expo.dev/guides/local-first/)
- [`expo-file-system`](https://docs.expo.dev/versions/v57.0.0/sdk/filesystem/)

**Build**
- [ ] Persist the cart across restarts, handling hydration properly (no flash of an empty cart; see the Exercise 13 gotcha)
- [ ] Store todos in **SQLite**: create a table, run migrations with `PRAGMA user_version`, and implement CRUD
- [ ] Make the product list **work offline**: cache the last response and show an "Offline, showing cached data" banner (builds on Exercise 20)
- [ ] Queue "add to cart" API calls while offline and replay them when back online

### 4.5 Forms
**Learn:** `react-hook-form` + `zod` (`zodResolver`), `Controller` for RN inputs, field-level errors, focus chaining with refs (`returnKeyType="next"`), `autoComplete` / `textContentType` for autofill, and keyboard dismissal.

**Read**
- [React Hook Form: Get started](https://react-hook-form.com/get-started) (has a React Native section) and the `Controller` API page
- [Zod](https://zod.dev/) and the `zodResolver` from `@hookform/resolvers`
- [TextInput](https://reactnative.dev/docs/textinput) props for autofill (`autoComplete`, `textContentType`, `returnKeyType`)

**Build**
- [ ] A **checkout form**: name, email, phone, address, postcode, card-number mask. Validate on blur, show errors inline, and pressing "next" on the keyboard should move to the next field.
- [ ] Finish Exercise 5's submit button using this approach, and compare the code size

### 4.6 Real-time data
**Learn**
- **WebSockets** in RN: the built-in `WebSocket` global, its lifecycle events (`onopen`/`onmessage`/`onclose`/`onerror`), and heartbeats (ping/pong) to detect dead connections
- **Reconnection**: exponential backoff with jitter; reconnecting when NetInfo reports the network is back; closing the socket when the app goes to the background and reopening it on foreground (iOS will suspend it anyway)
- Pushing socket messages into server state: update the TanStack Query cache with `queryClient.setQueryData` instead of keeping a separate copy
- Alternatives and when to pick them: Server-Sent Events, polling (Exercise 15), Firebase/Supabase Realtime, Socket.IO, GraphQL subscriptions
- What happens when the app is backgrounded: the socket goes away, so you fall back to **push notifications** (Phase 6.3)

**Read**
- [Networking](https://reactnative.dev/docs/network) (WebSocket section) and the [WebSocket global](https://reactnative.dev/docs/global-WebSocket)
- [MDN: WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) (the RN `WebSocket` follows the same API)
- TkDodo's [Using WebSockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)
- [`ws` for Node](https://github.com/websockets/ws) for your local test server

**Build**
- [ ] A **live order-status** screen ("Confirmed → Packing → Out for delivery → Delivered") driven by a WebSocket. Use a public echo server or a 20-line Node `ws` server you run locally.
- [ ] A `useSocket` hook that handles connect, heartbeat, backoff reconnect, AppState and NetInfo, and exposes a `status` of `'connecting' | 'open' | 'reconnecting' | 'closed'`
- [ ] A small **support chat** with optimistic send: the message appears immediately as "sending", then becomes "sent" on server ack, or "failed — tap to retry". Keep message order correct even when acks arrive out of order.
- [ ] Kill the server mid-chat, restart it, and confirm the app recovers without the user doing anything

**Interview check**
- Server state vs client state: why treat them differently?
- Redux vs Context vs Zustand: when would you choose each?
- Where do you store an auth token and why *not* AsyncStorage?
- How would you design offline support for a shopping cart?
- WebSockets vs SSE vs polling vs push: how do you choose, and what happens to each when the app is backgrounded?

---

## Phase 5 — Animation & Gestures (Weeks 13–14)

### 5.1 Built-in Animated API (know it, but don't depend on it)
- [ ] Fade + slide a toast in and out with `Animated.timing`, using `useNativeDriver: true`. Understand which properties the native driver supports (transform and opacity, but not layout).

**Read:** [Animations](https://reactnative.dev/docs/animations) and [Animation in Expo](https://docs.expo.dev/develop/user-interface/animation/)

### 5.2 Reanimated
**Learn:** shared values (`useSharedValue`), `useAnimatedStyle`, `withTiming`/`withSpring`/`withSequence`/`withRepeat`, **worklets** and the UI thread, `runOnJS`/`scheduleOnRN`, `interpolate`, layout animations (`entering`/`exiting`/`LinearTransition`), scroll-driven animations (`useAnimatedScrollHandler`).

**Read**
- Reanimated [Fundamentals](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/), all pages in order (Your first animation → Glossary)
- Core API pages: [`useSharedValue`](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue/), [`useAnimatedStyle`](https://docs.swmansion.com/react-native-reanimated/docs/core/useAnimatedStyle/), [`useDerivedValue`](https://docs.swmansion.com/react-native-reanimated/docs/core/useDerivedValue/)
- Then the Layout Animations and Scroll sections from the same docs' sidebar

**Build**
- [ ] Rebuild Exercise 19 with Reanimated
- [ ] **"Fly to cart"** animation: when tapping "Add to cart", a dot animates from the button to the basket icon, and the basket "bounces"
- [ ] Animated cart badge count (scale pop on change)
- [ ] Cart items animate in and out with layout animations when added or removed
- [ ] Collapsing header on the product detail screen driven by scroll position

### 5.3 Gesture Handler
**Learn:** `GestureDetector`, `Gesture.Pan/Tap/LongPress/Pinch`, composing gestures (`Simultaneous`, `Exclusive`), and integrating with Reanimated.

**Read**
- Gesture Handler [Getting started](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/getting-started), then the Gestures and Gesture composition pages
- Reanimated's [Handling gestures](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/handling-gestures/)
- The Expo tutorial's [gestures chapter](https://docs.expo.dev/tutorial/gestures/) (a short worked example)
- [`@gorhom/bottom-sheet`](https://gorhom.dev/react-native-bottom-sheet/)

**Build**
- [ ] **Swipe-to-delete** on cart items, with a haptic at the threshold (`expo-haptics`)
- [ ] Pinch-to-zoom + double-tap-to-zoom on the product image
- [ ] A draggable **bottom sheet** for product filters, built from scratch first and then with `@gorhom/bottom-sheet`. Compare the two.

**Interview check**
- Why do JS-thread animations jank, and how does Reanimated avoid it?
- What's a worklet?
- How do you hand control back from the UI thread to JS?

---

## Phase 6 — Device & Native Features, Payments (Weeks 15–18)

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

**Read**
- [Permissions in Expo](https://docs.expo.dev/guides/permissions/)
- Apple: [Requesting access to protected resources](https://developer.apple.com/documentation/uikit/requesting-access-to-protected-resources) · Android: [Request runtime permissions](https://developer.android.com/training/permissions/requesting)
- [Apple privacy manifests in Expo](https://docs.expo.dev/guides/apple-privacy/)

### 6.1 Camera & media
**Learn:** `expo-camera` (`CameraView`, `useCameraPermissions`, `takePictureAsync`, `recordAsync`, `barcodeScannerSettings` + `onBarcodeScanned`), `expo-image-picker` (gallery and quick camera), `expo-media-library` (saving to the camera roll), `expo-image-manipulator` (resize/compress before upload).

**Read**
- [`expo-camera`](https://docs.expo.dev/versions/v57.0.0/sdk/camera/), [`expo-image-picker`](https://docs.expo.dev/versions/v57.0.0/sdk/imagepicker/), [`expo-media-library`](https://docs.expo.dev/versions/v57.0.0/sdk/media-library/), [`expo-image-manipulator`](https://docs.expo.dev/versions/v57.0.0/sdk/imagemanipulator/)
- The Expo tutorial's [image picker chapter](https://docs.expo.dev/tutorial/image-picker/)

**Build**
- [ ] **Barcode scanner**: give each product a barcode, scan it, and add the product to the cart (with a haptic and a success sound). Debounce so one scan doesn't add the item 10 times.
- [ ] **Product review with a photo**: take a photo *or* pick from the gallery, show a preview, compress to under 500 KB, and "upload" it (POST multipart to a test endpoint such as httpbin.org)
- [ ] Pause the camera when the screen loses focus or the app goes to the background (`useIsFocused` + Exercise 40)
- [ ] Profile avatar: crop to a square and persist the file with `expo-file-system`

### 6.2 Location & maps
**Learn:** `expo-location` (`useForegroundPermissions`, `getCurrentPositionAsync`, `getLastKnownPositionAsync`, `watchPositionAsync`, `reverseGeocodeAsync`, accuracy levels and battery trade-offs), background location + geofencing with `TaskManager.defineTask` (dev build required on iOS), maps with `react-native-maps` or `expo-maps`.

**Read**
- [`expo-location`](https://docs.expo.dev/versions/v57.0.0/sdk/location/) (read the background location and geofencing sections carefully) and [`expo-task-manager`](https://docs.expo.dev/versions/v57.0.0/sdk/task-manager/)
- [`expo-maps`](https://docs.expo.dev/versions/v57.0.0/sdk/maps/) or [`react-native-maps`](https://docs.expo.dev/versions/v57.0.0/sdk/map-view/)

**Build**
- [ ] **Store finder** screen: a map with markers for fake store locations, the user's location, the nearest store highlighted, and the distance to each store (Haversine formula)
- [ ] Auto-fill the checkout address with `reverseGeocodeAsync`
- [ ] Live-tracking "delivery driver" demo with `watchPositionAsync` (simulate movement in the simulator: Features → Location → City Run)
- [ ] Stretch: geofence notification "You're near a Mini-Mart store!" (needs a dev build + background permission)

### 6.3 Notifications
**Learn:** `expo-notifications`: permissions, `setNotificationHandler` (foreground presentation), `scheduleNotificationAsync` (local; time, date and repeating triggers), Android notification channels, `addNotificationReceivedListener` / `addNotificationResponseReceivedListener` (tap → navigate), push tokens (`getExpoPushTokenAsync`), the Expo push service vs FCM/APNs direct. **Remote push needs a dev build.** Local notifications work in Expo Go.

**Read**
- [Push notifications overview](https://docs.expo.dev/push-notifications/overview/) → [What you need to know](https://docs.expo.dev/push-notifications/what-you-need-to-know/) → [Setup](https://docs.expo.dev/push-notifications/push-notifications-setup/) → [Sending](https://docs.expo.dev/push-notifications/sending-notifications/) → [Receiving](https://docs.expo.dev/push-notifications/receiving-notifications/). Read them in this order.
- [`expo-notifications`](https://docs.expo.dev/versions/v57.0.0/sdk/notifications/) reference (triggers, channels, `getLastNotificationResponse`)

**Build**
- [ ] "You left items in your cart" local notification 1 hour after backgrounding with a non-empty cart. Cancel it if the user returns.
- [ ] Tapping a notification deep-links to the cart (including when the app was **killed**, using `getLastNotificationResponse`)
- [ ] Send yourself a real push via the Expo push tool from a dev build on a physical device
- [ ] Set the app icon badge count to match the number of cart items

### 6.4 Everything else a modern app touches
**Read:** each package's page in the [Expo SDK 57 reference](https://docs.expo.dev/versions/v57.0.0/). Read the intro, the config-plugin / permissions section and the example before building. Also read [`expo-background-task`](https://docs.expo.dev/versions/v57.0.0/sdk/background-task/) properly; its notes on OS scheduling limits are interview material.

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
- [ ] **Bluetooth / NFC** (optional, for IoT or retail roles): know `react-native-ble-plx` (BLE scan, connect, read/write characteristics) and `react-native-nfc-manager` exist, and that both need a dev build and physical hardware to test

### 6.5 Payments & in-app purchases
Payments come up in almost every commercial app, and the first thing to get right is **which payment system the stores allow**.

**Learn**
- **The store rules:** physical goods and real-world services (a shop like this one, food delivery, taxis) use a normal payment provider such as Stripe. **Digital goods** (subscriptions, premium features, in-game currency) must generally use **Apple In-App Purchase / Google Play Billing**. Regional exceptions and the rules on linking to external payment have been changing, so check the current App Store Review Guidelines (section 3.1) and Play policy.
- **Stripe** (`@stripe/stripe-react-native`, listed in Expo's third-party library docs): PaymentSheet, PaymentIntents created **on your server** (never with the secret key in the app), 3-D Secure / SCA (important in the UK and EU), and Apple Pay / Google Pay through the same sheet
- **In-app purchases**: products vs subscriptions, receipt/purchase-token validation **on the server**, restoring purchases, entitlements, sandbox testers. Most teams use **RevenueCat** (`react-native-purchases`) rather than StoreKit / Play Billing directly; know what it saves you.
- Webhooks: the server, not the app, is the source of truth for "has this been paid?"

**Read**
- Stripe [Accept a payment (React Native)](https://docs.stripe.com/payments/accept-a-payment?payment-ui=mobile&platform=react-native) and [Stripe in Expo](https://docs.expo.dev/versions/v57.0.0/sdk/stripe/)
- [In-app purchases in Expo](https://docs.expo.dev/guides/in-app-purchases/) and RevenueCat's [React Native installation](https://www.revenuecat.com/docs/getting-started/installation/reactnative)
- App Store Review Guidelines, [section 3.1 (Payments)](https://developer.apple.com/app-store/review/guidelines/#payments) and Google Play's [Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738)
- [API routes in Expo Router](https://docs.expo.dev/router/web/api-routes/) (one option for the tiny backend)

**Build**
- [ ] A tiny backend (an Expo Router API route, a Supabase Edge Function, or a small Node server) that creates a Stripe PaymentIntent in **test mode**
- [ ] Wire the checkout from Phase 4.5 to Stripe PaymentSheet. Test a successful card, a declined card and a 3-D Secure card using Stripe's test card numbers.
- [ ] Add Apple Pay / Google Pay to the same sheet
- [ ] A **"Mini-Mart Plus"** subscription (free delivery) using RevenueCat in sandbox: a paywall screen, purchase, restore purchases, and gating a feature on the entitlement
- [ ] Show order confirmation only after the server confirms payment, not when the sheet closes

**Interview check**
- Walk through the permission lifecycle and the differences between iOS and Android
- What's the difference between local and push notifications, and how does push delivery work (APNs/FCM, tokens)?
- How do you handle a notification tap when the app is killed vs backgrounded vs foregrounded?
- How would you save battery in a location-tracking app?
- Why can't you just do background work whenever you want on iOS?
- When must you use In-App Purchase instead of Stripe? Why is receipt validation done on the server?
- Why should the app never decide on its own that a payment succeeded?

---

## Phase 7 — Native Modules & Config Plugins (Week 19)

This is what separates "React Native developer" from "JS developer who uses React Native". Your Flutter platform-channel experience applies directly here.

**Learn**
- **Expo Modules API**: write native modules in Swift and Kotlin with a declarative DSL (`Name`, `Function`, `AsyncFunction`, `Events`, `View`)
- Turbo Modules + Codegen (the RN-core way): know what they are, even if you use Expo Modules
- **Config plugins**: modify `Info.plist`, `AndroidManifest.xml`, Gradle and Podfile at prebuild time
- When to write native code vs finding a library

**Read**
- [Expo Modules API overview](https://docs.expo.dev/modules/overview/) → [Get started](https://docs.expo.dev/modules/get-started/) → [Native module tutorial](https://docs.expo.dev/modules/native-module-tutorial/) → [Native view tutorial](https://docs.expo.dev/modules/native-view-tutorial/). Read them in this order.
- [Module API reference](https://docs.expo.dev/modules/module-api/)
- [Config plugins introduction](https://docs.expo.dev/config-plugins/introduction/), [Plugins](https://docs.expo.dev/config-plugins/plugins/), [Mods](https://docs.expo.dev/config-plugins/mods/)
- For comparison: [Turbo Native Modules introduction](https://reactnative.dev/docs/turbo-native-modules-introduction) and [What is Codegen?](https://reactnative.dev/docs/the-new-architecture/what-is-codegen)

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

## Phase 8 — Quality: Testing, Performance, Accessibility, i18n, Security (Weeks 20–22)

### 8.1 Testing
**Learn:** Jest with the `jest-expo` preset; **React Native Testing Library** (`render`, `screen.getByRole/getByText`, `fireEvent`/`userEvent`, `waitFor`, `findBy*`), testing *behaviour* rather than implementation, mocking native modules (`jest.mock('expo-location')`), mocking network calls with **MSW**, testing Redux reducers and selectors as pure functions, testing hooks with `renderHook`. E2E with **Maestro** (YAML flows; supported by EAS Workflows) or Detox.

**Read**
- [Unit testing with Jest in Expo](https://docs.expo.dev/develop/unit-testing/) and React Native's [Testing overview](https://reactnative.dev/docs/testing-overview)
- [React Native Testing Library](https://oss.callstack.com/react-native-testing-library/) (Getting started + the "How should I query?" guide)
- Kent C. Dodds, [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) (written for web; the principles are identical)
- [E2E tests in Expo](https://docs.expo.dev/guides/using-e2e/), [Maestro docs](https://docs.maestro.dev/), [EAS Workflows E2E example](https://docs.expo.dev/eas/workflows/examples/e2e-tests/)
- [Testing Expo Router](https://docs.expo.dev/router/reference/testing/)

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

**Read**
- [Performance overview](https://reactnative.dev/docs/performance) and [Profiling](https://reactnative.dev/docs/profiling)
- [React Native DevTools](https://reactnative.dev/docs/react-native-devtools) and [Debugging tools in Expo](https://docs.expo.dev/debugging/tools/)
- [Analyzing bundles (Expo Atlas)](https://docs.expo.dev/guides/analyzing-bundles/) and [Optimizing JavaScript loading](https://reactnative.dev/docs/optimizing-javascript-loading)
- Callstack's free ebook, *The Ultimate Guide to React Native Optimization* (search for the latest edition on callstack.com)

**Build**
- [ ] Profile the 5,000-item product list, find the 3 biggest wins, and document before/after numbers in a `PERFORMANCE.md`
- [ ] Turn on React Compiler and measure the difference
- [ ] Analyse the bundle with Expo Atlas and remove one heavy dependency or import

### 8.3 Accessibility
**Learn:** `accessible`, `accessibilityLabel`, `accessibilityHint`, `accessibilityRole`, `accessibilityState`, `accessibilityValue` (and the newer `aria-*`/`role` props), `importantForAccessibility`, focus order, minimum 44×44pt touch targets, `allowFontScaling` and Dynamic Type, colour contrast, reduced motion (`AccessibilityInfo.isReduceMotionEnabled` / Reanimated's `useReducedMotion`).

**Read**
- [Accessibility](https://reactnative.dev/docs/accessibility) and [AccessibilityInfo](https://reactnative.dev/docs/accessibilityinfo)
- Apple [Human Interface Guidelines: Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) and Android's [Make apps more accessible](https://developer.android.com/guide/topics/ui/accessibility/apps)

**Build**
- [ ] Navigate the whole shop using **VoiceOver** (iOS) and **TalkBack** (Android) only, and fix everything that's confusing. For example, the "+"/"-" icon buttons in Exercise 1 currently have no labels.
- [ ] Test at the largest accessibility font size, and fix any truncated or overlapping text
- [ ] Respect reduced motion in your Phase 5 animations

### 8.4 Internationalisation
**Learn:** `expo-localization`, `i18next` + `react-i18next` (or `lingui`), `Intl.NumberFormat` / `Intl.DateTimeFormat`, pluralisation, RTL layouts (`I18nManager`, `start`/`end` instead of `left`/`right`).

**Read**
- [Localization in Expo](https://docs.expo.dev/guides/localization/) and [`expo-localization`](https://docs.expo.dev/versions/v57.0.0/sdk/localization/)
- [react-i18next](https://react.i18next.com/) (Getting started + the pluralisation page in the i18next docs)
- MDN: [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- [I18nManager](https://reactnative.dev/docs/i18nmanager) (RTL)

**Build**
- [ ] Replace hard-coded `£${price.toFixed(2)}` with `Intl.NumberFormat(locale, { style: 'currency', currency })`
- [ ] Translate the app into one more language, and make sure pluralisation works ("1 item" / "2 items")
- [ ] Turn on RTL and fix the layout issues

### 8.5 Security
**Learn**
- **The core rule:** the JS bundle can be extracted and read, even when compiled to Hermes bytecode. Treat everything in the app (API keys, `EXPO_PUBLIC_*` values, business logic) as public. Secrets and authority live on the server.
- Storage: tokens in `expo-secure-store`, never in AsyncStorage or Redux-persist; clear them all on logout
- Transport: HTTPS only (ATS on iOS, `cleartextTrafficPermitted` on Android); **SSL/certificate pinning** (e.g. `react-native-ssl-public-key-pinning`) and its operational risk: rotating a pinned certificate can lock out old app versions
- **Device and app integrity**: Apple App Attest / Google Play Integrity (`expo-app-integrity`), checked **on the server**. Jailbreak/root detection (e.g. `jail-monkey`) is easy to bypass, so use it as a signal, not a gate.
- Sensitive screens: hide content in the app switcher, block screenshots/screen recording on a payment screen (`expo-screen-capture`), and lock the app after time in the background (biometrics from Phase 6.4)
- Deep links are untrusted input: validate params from `minishop://` URLs before acting on them
- Logging: never log tokens or personal data; scrub them before they reach Sentry
- Reference: the **OWASP Mobile Top 10** and MASVS

**Read**
- [Security](https://reactnative.dev/docs/security) (React Native's own security guide; short and important)
- [OWASP MASVS](https://mas.owasp.org/MASVS/) (the standard) and the [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)
- [Environment variables in Expo](https://docs.expo.dev/guides/environment-variables/) (what `EXPO_PUBLIC_` really means)
- [`expo-app-integrity`](https://docs.expo.dev/versions/v57.0.0/sdk/app-integrity/) and [`expo-screen-capture`](https://docs.expo.dev/versions/v57.0.0/sdk/screen-capture/)
- [Data and privacy protection](https://docs.expo.dev/regulatory-compliance/data-and-privacy-protection/)

**Build**
- [ ] Audit the app: search the bundle (`npx expo export`, then grep the output) for anything that looks like a key or secret, and move it server-side
- [ ] Add public-key pinning for your API domain with a backup pin. Then prove it works by pointing the app at a proxy like Charles or Proxyman and watching requests fail.
- [ ] Blur the app in the app switcher and block screenshots on the checkout screen
- [ ] Add a Sentry `beforeSend` hook that strips the `Authorization` header and email addresses
- [ ] Validate deep-link params with Zod and show an error screen for malformed links

**Interview check**
- How do you find and fix a slow screen? Walk through your process.
- What do you unit test vs integration test vs E2E test in a mobile app?
- How do you make a custom button accessible?
- What is certificate pinning, what does it protect against, and how can it break your app?
- An API key is in your bundle. How bad is that, and what do you do?

---

## Phase 9 — Ship It: Builds, Releases & Operations (Week 23)

**Learn**
- **EAS Build**: `eas.json` profiles (development / preview / production), credentials and code signing (EAS can manage these for you), internal distribution (ad hoc / APK) for testers
- **App config**: move from `app.json` to `app.config.ts` for environment-dependent values. Use `EXPO_PUBLIC_*` env vars, and remember they're **embedded in the bundle, so never put secrets there**. Also know about EAS environment variables and secrets.
- **Versioning**: `version` vs `ios.buildNumber` / `android.versionCode`, and `autoIncrement`
- **EAS Submit**: TestFlight and Play Console internal testing
- **EAS Update / `expo-updates`**: OTA JS updates, channels and branches, `runtimeVersion` policies (what happens if native code changed?), rollouts, rollbacks, and checking for updates on launch
- **Monitoring**: crash and error reporting (Sentry with source maps), analytics, logging
- **CI/CD**: EAS Workflows or GitHub Actions running `eas build`, then a Maestro E2E run, then `eas submit`
- Store requirements: privacy manifests (iOS), data-safety form (Android), App Tracking Transparency (`expo-tracking-transparency`), Sign in with Apple rules, review guidelines

**Read**
- The [EAS tutorial](https://docs.expo.dev/tutorial/eas/introduction/), all chapters. It walks through exactly this phase: build profiles, app variants, internal distribution, versioning and production builds.
- [EAS Update introduction](https://docs.expo.dev/eas-update/introduction/), [How it works](https://docs.expo.dev/eas-update/how-it-works/), [Runtime versions](https://docs.expo.dev/eas-update/runtime-versions/), [Rollouts](https://docs.expo.dev/eas-update/rollouts/), [Rollbacks](https://docs.expo.dev/eas-update/rollbacks/)
- [EAS environment variables](https://docs.expo.dev/eas/environment-variables/) and [App versions](https://docs.expo.dev/build-reference/app-versions/)
- [Using Sentry](https://docs.expo.dev/guides/using-sentry/)
- The [CI/CD tutorial](https://docs.expo.dev/tutorial/cicd/introduction/) (EAS Workflows)
- [Upgrading the Expo SDK walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) (for the SDK 58 task)

**Build**
- [ ] Rename `bundleIdentifier` from `com.anonymous.mini-shop` to your own reverse domain
- [ ] Configure `eas.json` with 3 profiles and build a **preview** build to install on your own phone
- [ ] Have separate app icons and names per environment ("Mini-Mart (Dev)") via `app.config.ts`
- [ ] Publish an OTA update that changes some text, and watch it arrive on the preview build
- [ ] Integrate Sentry, trigger a test crash, and confirm you get a readable stack trace
- [ ] Optional: ship to TestFlight / Play internal testing
- [ ] **Upgrade from SDK 57 to SDK 58** on a branch: read the SDK 58 changelog, run `npx expo install expo@^58.0.0 --fix`, then `npx expo-doctor`, fix any breaking changes, rebuild the dev client, and run your tests and Maestro flow. Note what broke. This is your answer to "how do you keep an RN app up to date?"

**Interview check**
- How do OTA updates work and what are their limits? When must you ship a new binary?
- How do you manage environments (dev/staging/prod) in an Expo app?
- How do you upgrade React Native / the Expo SDK, and how often should a team do it?
- What does your release process look like, end to end?

---

## Phase 10 — Capstone & Interview Prep (Ongoing)

### 10.1 Capstone definition of done
By now `mini-shop` should be a credible portfolio app. Check off:
- [ ] Auth (Sign in with Apple + Google, secure token, silent refresh, protected routes, logout, account deletion)
- [ ] Product catalogue from an API with search, infinite scroll and offline cache
- [ ] Product detail with images, video, pinch-zoom and share
- [ ] Cart persisted across restarts, with animations, swipe-to-delete and a badge
- [ ] Checkout form with validation, address autofill from GPS, and biometric confirm
- [ ] Stripe test-mode payment (card + Apple Pay / Google Pay) and a sandbox subscription with restore purchases
- [ ] Live order status over WebSockets that survives network drops and backgrounding
- [ ] Security pass: no secrets in the bundle, certificate pinning, protected checkout screen
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
28. Design checkout and payments for a delivery app (PaymentIntents, webhooks, idempotency, failed and duplicate payments).
29. Design a subscription paywall that works across iOS, Android and web (entitlements, receipt validation, restores, family sharing).

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
- React Native Testing Library: https://oss.callstack.com/react-native-testing-library/
- Stripe React Native: https://docs.stripe.com/payments/accept-a-payment?payment-ui=mobile&platform=react-native
- RevenueCat: https://www.revenuecat.com/docs
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- OWASP Mobile Top 10 / MASVS: https://mas.owasp.org

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
