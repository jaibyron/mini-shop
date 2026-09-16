# React Native State Management Exercises

Progressive exercises to build competency with `useState` and `useEffect` hooks.
Use `GeneralUiScreen.tsx` to implement each exercise.

---

## Part 1: useState Fundamentals

### [ ] Exercise 1: Counter
Build a counter with increment and decrement buttons.

**Goals:**
- Create a `count` state variable initialized to 0
- Add two buttons: "+" and "-"
- Display the current count

**Key concept:** Use the functional update pattern for safety:
```tsx
setCount(prev => prev + 1)
```

**Stretch:** Add a reset button that sets count back to 0.

---

### [ ] Exercise 2: Toggle Visibility
Add a button that shows/hides a secret message.

**Goals:**
- Create an `isVisible` boolean state
- Toggle it when button is pressed
- Conditionally render a message based on state

**Key concept:** Boolean state and conditional rendering:
```tsx
{isVisible && <Text>Secret message!</Text>}
```

**Stretch:** Change the button text based on state ("Show" / "Hide").

---

### [ ] Exercise 3: Character Counter
Create a TextInput with a live character count display.

**Goals:**
- Store the input text in state
- Display "X/100 characters" below the input
- Change the count color to red when over 100

**Key concept:** Derived values — don't store the count separately, compute it:
```tsx
const charCount = text.length;
```

**Stretch:** Disable a "Submit" button when over the limit.

---

### [ ] Exercise 4: Theme Switcher
Build a light/dark theme toggle that changes the screen's appearance.

**Goals:**
- Create a `isDarkMode` boolean state
- Apply different background and text colors based on state
- Add a Switch or button to toggle

**Key concept:** Using state to drive styles:
```tsx
<View style={{ backgroundColor: isDarkMode ? '#333' : '#fff' }}>
```

---

### [ ] Exercise 5: Form with Multiple Fields
Create a form with name and email inputs, plus a submit button.

**Goals:**
- Use separate `useState` for each field
- Validate both fields aren't empty
- Disable submit button until form is valid
- Show the submitted data below the form after submission

**Key concept:** Multiple state variables and derived validation:
```tsx
const isValid = name.trim() !== '' && email.trim() !== '';
```

**Stretch:** Add basic email format validation.

---

### [ ] Exercise 6: Quantity Selector
Build a product quantity selector (like your cart).

**Goals:**
- Display a quantity starting at 1
- "+" button to increase, "-" button to decrease
- Minimum of 1, maximum of 10
- Display total price (quantity × £9.99)

**Key concept:** Constraining state updates:
```tsx
setQuantity(prev => Math.min(prev + 1, 10))
```

---

## Part 2: useEffect Basics

### [ ] Exercise 7: Document Title (Web) / Console Logger
Log a message every time a counter value changes.

**Goals:**
- Reuse your counter from Exercise 1
- Add a `useEffect` that logs the count whenever it changes

**Key concept:** useEffect with dependencies:
```tsx
useEffect(() => {
  console.log('Count changed to:', count);
}, [count]);
```

---

### [ ] Exercise 8: Timer / Stopwatch
Build a stopwatch that counts seconds.

**Goals:**
- Display elapsed seconds
- Start/Stop button to control the timer
- Reset button to set back to 0

**Key concept:** useEffect cleanup with intervals:
```tsx
useEffect(() => {
  if (!isRunning) return;
  
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);
  
  return () => clearInterval(interval);
}, [isRunning]);
```

**Stretch:** Format as MM:SS.

---

### [ ] Exercise 9: Fetch Data on Mount
Fetch and display a random joke when the screen loads.

**Goals:**
- Show a loading state initially
- Fetch from `https://official-joke-api.appspot.com/random_joke`
- Display the joke setup and punchline
- Add a "Get Another" button to fetch again

**Key concept:** useEffect with empty dependency array runs once:
```tsx
useEffect(() => {
  fetchJoke();
}, []);
```

**Stretch:** Handle errors gracefully with an error state.

---

### [ ] Exercise 10: Countdown Timer
Build a countdown from a user-specified number of seconds.

**Goals:**
- TextInput to enter starting seconds
- Start button begins countdown
- Display stops at 0
- Show "Time's up!" message when complete

**Key concept:** Combining user input with interval-based updates.

---

## Part 3: useEffect Advanced Patterns

### [ ] Exercise 11: Debounced Search
Create a search input that only "searches" after the user stops typing for 500ms.

**Goals:**
- TextInput for search query
- Log "Searching for: X" only after 500ms of no typing
- Show "Typing..." while user is actively typing

**Key concept:** Cleanup with setTimeout:
```tsx
useEffect(() => {
  const timeout = setTimeout(() => {
    console.log('Searching for:', query);
  }, 500);
  
  return () => clearTimeout(timeout);
}, [query]);
```

---

### [ ] Exercise 12: Window Dimensions Listener
Display the current screen width and height, updating on rotation.

**Goals:**
- Show current dimensions
- Update when device rotates

**Key concept:** useEffect with event subscriptions:
```tsx
useEffect(() => {
  const subscription = Dimensions.addEventListener('change', ({ window }) => {
    setDimensions(window);
  });
  
  return () => subscription.remove();
}, []);
```

---

### [ ] Exercise 13: Persisted Counter with AsyncStorage
Extend Exercise 1 to save the count to device storage.

**Goals:**
- Load saved count on mount
- Save count whenever it changes
- Count persists across app restarts

**Requires:** `npx expo install @react-native-async-storage/async-storage`

**Key concept:** Separate effects for load vs save:
```tsx
// Load on mount
useEffect(() => {
  AsyncStorage.getItem('count').then(value => {
    if (value) setCount(parseInt(value));
  });
}, []);

// Save on change
useEffect(() => {
  AsyncStorage.setItem('count', count.toString());
}, [count]);
```

---

### [ ] Exercise 14: Auto-Save Form
Build a notes field that auto-saves 2 seconds after the user stops typing.

**Goals:**
- TextInput for notes
- "Saving..." indicator appears while typing
- "Saved" indicator appears 2 seconds after last change
- Combine debouncing with AsyncStorage

**Key concept:** Combining multiple patterns (debounce + persist).

---

## Part 4: Combining useState and useEffect

### [ ] Exercise 15: Polling Data
Fetch data every 10 seconds automatically.

**Goals:**
- Fetch a joke on mount
- Re-fetch automatically every 10 seconds
- Show "Last updated: X seconds ago"
- Stop/start polling with a toggle

**Key concept:** Interval + fetch + cleanup:
```tsx
useEffect(() => {
  if (!isPolling) return;
  
  const interval = setInterval(fetchData, 10000);
  return () => clearInterval(interval);
}, [isPolling]);
```

---

### [ ] Exercise 16: Multi-Step Form Wizard
Build a 3-step form (Personal Info → Address → Review).

**Goals:**
- Track current step in state
- Each step has its own fields
- "Next" and "Back" buttons
- Final step shows all entered data

**Key concept:** Managing complex related state.

**Stretch:** Validate each step before allowing "Next".

---

### [ ] Exercise 17: Infinite Scroll List
Load more items as the user scrolls to the bottom.

**Goals:**
- Start with 10 items
- Detect when scrolled to bottom
- Load 10 more items
- Show loading indicator while fetching

**Key concept:** FlatList's `onEndReached` + state accumulation:
```tsx
setItems(prev => [...prev, ...newItems])
```

---

### [ ] Exercise 18: Real-Time Clock
Display a live clock showing current time (HH:MM:SS).

**Goals:**
- Update every second
- Clean up interval on unmount
- Format time nicely

---

### [ ] Exercise 19: Animation Controller
Build a component that animates a box's position.

**Goals:**
- Box moves across the screen
- Play/Pause/Reset controls
- useEffect manages the animation loop

**Stretch:** Use `react-native-reanimated` for smoother animations.

---

### [ ] Exercise 20: Data Sync Indicator
Show online/offline status and sync state.

**Goals:**
- Detect network status changes
- Show "Online" / "Offline" badge
- When coming back online, show "Syncing..." then "Synced"

**Key concept:** Multiple effects responding to different conditions.

---

## Part 5: useMemo & useCallback

### [ ] Exercise 21: Expensive Filtered List
Build a list with a text filter where filtering is computationally expensive.

**Goals:**
- Create an array of 5000 items (generate in state on mount)
- Add a TextInput to filter the list by name
- Use `useMemo` to avoid re-filtering on every render
- Add a counter button (unrelated state) to prove the filter doesn't re-run when it changes

**Key concept:** `useMemo` caches a computed value:
```tsx
const filteredItems = useMemo(() => {
  console.log('Filtering...'); // should only log when query changes
  return items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}, [items, query]);
```

**Stretch:** Add a sort toggle and memoize the sorted + filtered result.

---

### [ ] Exercise 22: Stable Callback for Child Component
Pass an increment function to a child component without causing unnecessary re-renders.

**Goals:**
- Create a parent with a counter state
- Create a `<CounterButton />` child wrapped in `React.memo`
- Pass an `onIncrement` callback to the child
- Without `useCallback`, the child re-renders every time the parent renders
- Add `useCallback` and verify the child stops re-rendering

**Key concept:** `useCallback` returns a stable function reference:
```tsx
const handleIncrement = useCallback(() => {
  setCount(prev => prev + 1);
}, []);
```

**How to verify:** Add `console.log('CounterButton rendered')` inside the child. It should only log on mount, not on every parent render.

---

### [ ] Exercise 23: Memoized Cart Total
Calculate and display a cart total using `useMemo`.

**Goals:**
- Create a list of cart items with name, price, and quantity
- Allow changing quantity per item
- Use `useMemo` to compute the total price
- Add an unrelated state (e.g., a notes TextInput) to prove the total isn't recalculated when typing notes

**Key concept:** Deriving expensive values from state:
```tsx
const total = useMemo(() => {
  console.log('Recalculating total...');
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}, [cartItems]);
```

---

### [ ] Exercise 24: Debounced Search with useCallback
Combine `useCallback` with a debounced search handler.

**Goals:**
- TextInput for search
- Create a debounced search function with `useCallback`
- The search function should only be created once, not on every render
- Display search results below

**Key concept:** Stabilizing a function that uses `setTimeout`:
```tsx
const debouncedSearch = useCallback((text: string) => {
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => {
    setResults(performSearch(text));
  }, 500);
}, []);
```

**Note:** Use `useRef` for the timeout ID so it persists across renders without causing re-renders.

---

### [ ] Exercise 25: Render Counter (Understanding When Memoization Helps)
Build a component that visually shows render counts to understand when `useMemo` and `useCallback` actually matter.

**Goals:**
- Create three child components, each with a render counter (`useRef` to track count)
- Child A: receives a plain object prop (re-renders every time)
- Child B: receives a `useMemo`-ed object prop (only re-renders when data changes)
- Child C: receives a `useCallback`-ed handler prop (only re-renders when dependencies change)
- Wrap all children in `React.memo`
- Add a button in the parent that forces a re-render (e.g., updates unrelated state)

**Key concept:** Understanding referential equality:
```tsx
// New object every render — Child A re-renders
const config = { theme: 'dark' };

// Same object reference if theme hasn't changed — Child B skips
const config = useMemo(() => ({ theme }), [theme]);
```

**Stretch:** Display each child's render count on screen to make the difference visible.

---

### [ ] Exercise 26: Memoized Sort with Toggle
Build a list that can be sorted ascending or descending, with memoized sorting.

**Goals:**
- Display a list of 1000 items with a numeric value
- Add a toggle button for ascending/descending sort
- Use `useMemo` to sort only when the data or sort direction changes
- Add a TextInput (unrelated state) to prove sorting doesn't re-run while typing

**Key concept:** Multiple dependencies in `useMemo`:
```tsx
const sortedItems = useMemo(() => {
  console.log('Sorting...');
  return [...items].sort((a, b) =>
    ascending ? a.value - b.value : b.value - a.value
  );
}, [items, ascending]);
```

---

## Part 6: useRef

### [ ] Exercise 27: Focus a TextInput on Mount
Automatically focus a TextInput when the screen loads.

**Goals:**
- Create a TextInput with a ref
- Use `useEffect` to call `.focus()` on mount
- Add a "Refocus" button that focuses the input again when pressed

**Key concept:** Accessing a native component imperatively:
```tsx
const inputRef = useRef<TextInput>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

<TextInput ref={inputRef} />
```

---

### [ ] Exercise 28: Scroll to Top / Bottom
Add buttons that scroll a ScrollView to the top or bottom.

**Goals:**
- Create a ScrollView with enough content to scroll
- Add a "Scroll to Top" button that calls `scrollTo({ y: 0 })`
- Add a "Scroll to Bottom" button that calls `scrollToEnd()`
- Use a ref to access the ScrollView methods

**Key concept:** Imperative control of scrollable components:
```tsx
const scrollRef = useRef<ScrollView>(null);

scrollRef.current?.scrollTo({ y: 0, animated: true });
scrollRef.current?.scrollToEnd({ animated: true });
```

---

### [ ] Exercise 29: Tracking Previous State
Display both the current and previous value of a counter.

**Goals:**
- Build a counter with increment/decrement
- Display "Current: X, Previous: Y"
- Use `useRef` to store the previous value (not state — you don't want an extra render)

**Key concept:** Refs persist across renders without triggering re-renders:
```tsx
const prevCountRef = useRef(0);

useEffect(() => {
  prevCountRef.current = count;
}, [count]);

// During render, prevCountRef.current still holds the old value
// because the effect runs *after* render
```

---

### [ ] Exercise 30: Render Counter (Without Infinite Loops)
Display how many times a component has rendered.

**Goals:**
- Show "This component has rendered X times"
- Increment the count on every render
- Understand why `useState` would cause an infinite loop here but `useRef` doesn't

**Key concept:** `useRef` mutations don't trigger re-renders:
```tsx
const renderCount = useRef(0);
renderCount.current += 1;
// Safe — no re-render triggered

// vs useState (DON'T do this):
// setRenderCount(prev => prev + 1); // infinite loop!
```

---

### [ ] Exercise 31: Uncontrolled Form with Refs
Build a form where you read values on submit using refs instead of state.

**Goals:**
- Create name and email TextInputs
- Don't use `useState` for the input values
- On submit, read the values from refs
- Display the submitted data

**Key concept:** Uncontrolled inputs — useful when you only need the value at submission time:
```tsx
const nameRef = useRef('');

<TextInput
  onChangeText={(text) => { nameRef.current = text; }}
/>

const handleSubmit = () => {
  console.log('Name:', nameRef.current);
};
```

**Discussion:** When would you choose uncontrolled (ref) vs controlled (state)? Controlled is better when you need live validation or derived UI. Uncontrolled avoids re-renders on every keystroke.

---

### [ ] Exercise 32: Interval ID Storage
Build a stopwatch that stores the interval ID in a ref.

**Goals:**
- Start/stop/reset a timer
- Store the interval ID in `useRef` (not state)
- Start and stop from separate button handlers (not just useEffect cleanup)

**Key concept:** Sharing a mutable value between event handlers:
```tsx
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

const start = () => {
  intervalRef.current = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);
};

const stop = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
};
```

**Compare with Exercise 8:** In that exercise, the interval lived inside `useEffect`. Here, you control it from event handlers — `useRef` is what makes that possible.

---

### [ ] Exercise 33: Measure a Component's Layout
Display the width and height of a View after it renders.

**Goals:**
- Create a View with dynamic content (e.g., text that can grow)
- Use `onLayout` to measure its dimensions
- Store the measurements in state to display them
- Use a ref to the View and call `measure()` as an alternative approach

**Key concept:** Two ways to measure layout:
```tsx
// Approach 1: onLayout event
<View onLayout={(event) => {
  const { width, height } = event.nativeEvent.layout;
  setSize({ width, height });
}} />

// Approach 2: ref + measure()
const viewRef = useRef<View>(null);
viewRef.current?.measure((x, y, width, height) => {
  setSize({ width, height });
});
```

---

### [ ] Exercise 34: Avoiding Stale Closures
Demonstrate and fix a stale closure bug using `useRef`.

**Goals:**
- Create a counter with a "Log count in 3 seconds" button
- First, implement with just state — click the button, then quickly increment. The logged value will be stale.
- Fix it using a ref that always holds the latest count

**Key concept:** Refs as an escape hatch from stale closures:
```tsx
const countRef = useRef(count);
countRef.current = count; // always up to date

const logCountLater = () => {
  setTimeout(() => {
    // count here is stale (captured at click time)
    console.log('State value:', count);
    // countRef.current is always fresh
    console.log('Ref value:', countRef.current);
  }, 3000);
};
```

**Discussion:** This is a fundamental React pattern. State gives you render-time snapshots. Refs give you the latest mutable value.

---

## Completion Checklist

| # | Exercise | Completed |
|---|----------|-----------|
| 1 | Counter | [ ] |
| 2 | Toggle Visibility | [ ] |
| 3 | Character Counter | [ ] |
| 4 | Theme Switcher | [ ] |
| 5 | Form with Multiple Fields | [ ] |
| 6 | Quantity Selector | [ ] |
| 7 | Console Logger | [ ] |
| 8 | Timer / Stopwatch | [ ] |
| 9 | Fetch Data on Mount | [ ] |
| 10 | Countdown Timer | [ ] |
| 11 | Debounced Search | [ ] |
| 12 | Window Dimensions Listener | [ ] |
| 13 | Persisted Counter | [ ] |
| 14 | Auto-Save Form | [ ] |
| 15 | Polling Data | [ ] |
| 16 | Multi-Step Form Wizard | [ ] |
| 17 | Infinite Scroll List | [ ] |
| 18 | Real-Time Clock | [ ] |
| 19 | Animation Controller | [ ] |
| 20 | Data Sync Indicator | [ ] |
| 21 | Expensive Filtered List | [ ] |
| 22 | Stable Callback for Child Component | [ ] |
| 23 | Memoized Cart Total | [ ] |
| 24 | Debounced Search with useCallback | [ ] |
| 25 | Render Counter | [ ] |
| 26 | Memoized Sort with Toggle | [ ] |
| 27 | Focus a TextInput on Mount | [ ] |
| 28 | Scroll to Top / Bottom | [ ] |
| 29 | Tracking Previous State | [ ] |
| 30 | Render Counter (Without Infinite Loops) | [ ] |
| 31 | Uncontrolled Form with Refs | [ ] |
| 32 | Interval ID Storage | [ ] |
| 33 | Measure a Component's Layout | [ ] |
| 34 | Avoiding Stale Closures | [ ] |

---

## Tips

1. **Start simple** — get basic functionality working before adding stretch goals
2. **Console.log liberally** — helps you understand when effects run
3. **Check the dependency array** — missing dependencies cause stale closures, extra dependencies cause unnecessary re-runs
4. **Always clean up** — intervals, timeouts, and subscriptions must be cleaned up to avoid memory leaks
5. **Functional updates** — use `setState(prev => ...)` when new state depends on previous state
