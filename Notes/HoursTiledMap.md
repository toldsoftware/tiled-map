# 2017-01-23

## 22:00-22:30

- Setup Project

## 22:31-02:30

- Draw Map

# 2017-01-27

## 9:00-24:00
## 0:00-01:00

- Move Tiles on Map

## 01:2:18

- Add Viewport Dragging
	- BUGGY - DISABLED for now

## 7:00-9:00

- Add Cloning
- Add Moving
- Add Serializing

## 9:00-11:00

- Improve Highlighting

## 16:45-17:15

- Support Touch

## 19:30-20:45

- Make full screen
- Support Multi-touch

## 20:46-21:30

- Improve UI

## 21:31-22:15

- Improve Highlighting

# 2017-01-30

## 20:30-22:30

- Publish to Server 

## 22:31-24:00
## 0:01-0:32

- Improve Performance
	- Redraw only changed tiles
		- What about Tiles with higher Z-Index that are drawn after the changed tile (especially overlapping it)
			- This would cause a whole pyramid to redraw
			- Solution: Redraw all overlapping tiles with clipping to the original area (so only items within the clip matter)

# 2017-01-31
## 7:00-9:00

- Improve UX
- Use Highlight (Bring to Front) Buffer

## 9:01-10:45

- iOS is causing artifacts from rounding to pixel
- START Pixel Perfect Draw 
	

##

	- Draw past the screen edge a bit for re-use for scrolling & zooming
	- Image Effects could be drawn per tile on demand

##

- Add Piece Selection

