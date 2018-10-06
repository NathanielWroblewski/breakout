Breakout
===

Destroy all the bricks without dropping the ball

![Screenshot](https://raw.githubusercontent.com/NathanielWroblewski/breakout/master/screenshot.png)

Running locally
---

On a mac, clone the repo then:

```
$ git clone https://github.com/NathanielWroblewski/breakout.git
$ cd breakout
$ open http://localhost:8000 && python -m SimpleHTTPServer
```

TODO
---
  - Refine brick reflection logic
  - Increase ball angle
  - Special bricks:
    - bricks that require multiple touches
    - bricks that speed up the ball
    - bricks that add another ball
    - bricks that reverse the paddle inputs
    - bricks that speed up the paddle
    - bricks that slow down the paddle
    - bricks that give the paddle a laser that the user can't re-fire unless it catches the rebound (at random angle/speed)
    - bricks that stretch paddle
    - bricks that create an extra paddle to shadow the main paddle
    - bricks that create extra paddles that circle the main paddle
