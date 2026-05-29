const throttledScroll = throttle(manageScroll, 2000);
function handleScroll() {
    throttledScroll();
}
function manageScroll(){
    console.log("Scroll event triggered");
}

/*
Step-by-step notes (for interviews) — how this `throttle` works:

1) Goal: Allow `func` to run at most once per `delay` ms. Options:
   - `leading` (default true): call immediately when allowed
   - `trailing` (default true): call once after the delay if calls happened

2) Key state captured in the closure:
   - `timeoutId` : holds a pending trailing `setTimeout` (one at a time)
   - `lastCall`  : timestamp (ms) when `func` last actually ran

3) On each wrapped-call (the returned function):
   a. Read current time (`now = Date.now()`)
   b. Preserve `this` as `self` for the later trailing call
   c. If `leading` is false and this is the first call, set `lastCall = now`
      → prevents an immediate call on the first invocation
   d. If `now - lastCall >= delay` then:
        - call `func` immediately with current `this` and `args`
        - update `lastCall = now`
        - clear any pending trailing timeout (avoid duplicate calls)
   e. Else (we are inside the delay window):
        - if `trailing` is true and no timeout is pending, schedule one
        - the scheduled function will call `func` with `self` and `args`
        - after running, it clears `timeoutId` and sets `lastCall`
          (if `leading` is true we set `lastCall = now` to mark the run)

4) Why things are done this way (short reasons to say in interviews):
   - `lastCall` enforces the time window; comparing `now - lastCall` decides
     whether to run immediately.
   - Clearing `timeoutId` prevents multiple trailing timers piling up.
   - Using `self` preserves the original `this` for delayed execution.
   - When `leading` is false, initializing `lastCall` prevents the immediate
     branch from triggering on the first call.

5) Quick memory cue: "Now → Leading? → Enough time? → Immediate & cancel → Else schedule trailing."

Usage examples:
  - `const t = throttle(fn, 200)` — normal throttle
  - `throttle(fn, 1000, { leading: false })` — wait first, then run
  - `throttle(fn, 1000, { trailing: false })` — run only on the leading edge
*/

function throttle(func, delay, options = {}) {
    const { leading = true, trailing = true } = options;
    // store a single timeout id for any pending trailing call
    let timeoutId = "";
    // timestamp of the last actual invocation of `func`
    let lastCall = 0;

    return function throttleFunction(...args) {
        // 1) current time
        let now = Date.now();
        // 2) keep `this` for delayed/trailing call
        const self = this || globalThis;

        // 3) If leading is disabled and this is the first call,
        //    initialize lastCall to now to skip immediate invocation
        if (!leading && lastCall === 0) {
            lastCall = now;
        }

        // 4) If enough time has passed since last execution -> run now
        if (now - lastCall >= delay) {
            func.apply(this, args); // immediate/leading invocation
            lastCall = now;

            // If there was a pending trailing call, cancel it (no duplicate)
            clearTimeout(timeoutId);
            timeoutId = "";
        }
        // 5) Otherwise, schedule a trailing call if allowed and none exists
        else if (trailing && !timeoutId) {
            timeoutId = setTimeout(() => {
                func.apply(self, args); // trailing invocation
                // clear timeout marker
                timeoutId = "";
                // mark lastCall depending on leading: if leading true,
                // set to `now` to indicate a recent run; otherwise reset
                lastCall = leading ? now : 0;
            }, delay);
        }
    };
}


// https://youtu.be/1Z3iEDAdUpM?si=yHsSypiZqSJ5QVDb