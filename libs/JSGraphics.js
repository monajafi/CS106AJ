/*
 * File: JSGraphics.js
 * -------------------
 * This file implements a self-contained version of the Stanford graphics
 * package that is not dependent on the java2js model for ensuring
 * Java/JavaScript compatibility.
 *
 * The typical usage pattern for this file is to include a script tag
 * that reads in this file at the head section of the index.html file,
 * as follows:
 *
 *    <script src="JSGraphics.js" type="text/javascript"></script>
 *
 * That line reads in the classes in the graphics package but does not
 * create a window.  To do so, the client must call the GWindow function.
 */

/*
 * Class: GWindow
 * --------------
 * This class defines a graphics window inside a web page.
 */

/*
 * Factory method: GWindow
 * Usage: let gw = GWindow();
 *        let gw = GWindow(id);
 *        let gw = GWindow(width, height);
 *        let gw = GWindow(id, width, height);
 * -------------------------------------------
 * Creates a new GWindow object and installs it in the element specified
 * by id.  If id is missing, it defaults to "JSConsole"; if width and height
 * are missing, the size of the size of the GWindow must be set using CSS.
 */

function GWindow(a1, a2, a3) {
   let id = "JSGraphics";
   let bg = "White";
   let fg = "Black";
   let font = "Courier New";
   let width = -1;
   let height = -1;
   if (a3 !== undefined) {
      id = a1;
      width = a2;
      height = a3;
   } else if (a2 !== undefined) {
      width = a1;
      height = a2;
   } else if (a1 !== undefined) {
      id = a1;
   }
   let startX = -999;
   let startY = -999;
   let mouseButtonDown = false;
   let scaleFactor = 1;
   let elements = [ ];
   let callbacks = { };
   let autoRepaintFlag = true;
   let canvas = document.createElement("canvas");
   canvas.contentEditable = true;
   canvas.style.border = "solid 1px black";
   canvas.style.overflowX = "hidden";
   canvas.style.overflowY = "hidden";
   canvas.style.outlineWidth = "0px";

   function _mousedown(e) {
      _updateMouseEvent(e);
      startX = e.getX();
      startY = e.getY();
      mouseButtonDown = true;
      let fn = callbacks["mousedown"];
      if (fn) fn(e);
   }

   function _mouseup(e) {
      _updateMouseEvent(e);
      mouseButtonDown = false;
      let fn = callbacks["mouseup"];
      if (fn) fn(e);
      fn = callbacks["click"];
      if (fn && Math.abs(startX - e.getX()) <= GWindow.CLICK_TOLERANCE &&
                Math.abs(startY - e.getY()) <= GWindow.CLICK_TOLERANCE) {
         fn(e);
      }
   }

   function _mousemove(e) {
      _updateMouseEvent(e);
      let fn = callbacks[mouseButtonDown ? "drag" : "mousemove"];
      if (fn) fn(e);
   }

   function _dblclick(e) {
      _updateMouseEvent(e);
      let fn = callbacks["dblclick"]
      if (fn && Math.abs(startX - e.getX()) <= GWindow.CLICK_TOLERANCE &&
                Math.abs(startY - e.getY()) <= GWindow.CLICK_TOLERANCE) {
         fn(e);
      }
   }

   canvas.addEventListener("mousedown", _mousedown, false);
   canvas.addEventListener("mouseup", _mouseup, false);
   canvas.addEventListener("mousemove", _mousemove, false);
   canvas.addEventListener("dblclick", _dblclick, false);

/*
 * Method: addEventListener
 * Usage: gw.addEventListener(type, listener);
 * -------------------------------------------
 * Adds an event listener of the specified type to the GWindow.
 */

   function addEventListener(type, listener) {
      callbacks[type] = listener;
   }

/*
 * Method: clear
 * Usage: gw.clear();
 * ------------------
 * Removes all GObjects from the window.  This method is equivalent to
 * removeAll.
 */

   function clear() {
      removeAll();
   }

/*
 * Method: removeAll
 * Usage: gw.removeAll();
 * ----------------------
 * Removes all GObjects from the window.
 */

   function removeAll() {
      elements = [ ];
      _conditionalRepaint();
   }

/*
 * Method: add
 * Usage: gw.add(gobj);
 *        gw.add(gobj, x, y);
 * --------------------------
 * Adds the specified GObject to the window at the location previously
 * stored in the object.  If x and y are supplied, the object is moved
 * to the specified location.
 */

   function add(gobj, x, y) {
      elements.push(gobj);
      if (x !== undefined) {
         if (y === undefined) {
            y = (x.getY === undefined) ? x.y : x.getY();
            x = (x.getX === undefined) ? x.x : x.getX();
         }
         gobj.setLocation(x, y);
      }
      gobj._setParent(gw);
      _conditionalRepaint();
   }

/*
 * Method: remove
 * Usage: gw.remove(gobj);
 * -----------------------
 * Removes the specified GObject from the window.  If the object is not
 * installed in the window, this method has no effect.
 */

   function remove(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 0) elements.splice(k, 1);
      gobj._setParent(null);
      _conditionalRepaint();
   }

/*
 * Method: setSize
 * Usage: gw.setSize(width, height);
 * ---------------------------------
 * Changes the dimensions of the GWindow as specified.
 */

   function setSize(width, height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
   }

/*
 * Method: getElementCount
 * Usage: let count = gw.getElementCount();
 * ----------------------------------------
 * Returns the number of graphical objects stored in this GWindow.
 */

   function getElementCount() {
      return elements.length;
   }

/*
 * Method: getElement
 * Usage: let gobj = gw.getElement(index);
 * ---------------------------------------
 * Returns the graphical object at the specified index, numbering from back
 * to front in the the z dimension.
 */

   function getElement(index) {
      return elements[index];
   }

/*
 * Method: getElementAt
 * Usage: let gobj = gw.getElementAt(x, y);
 * ----------------------------------------
 * Returns the topmost graphical object that contains the point (x, y)
 * or null if no such object exists.
 */

   function getElementAt(x, y) {
      if (y === undefined) {
         y = (x.getY === undefined) ? x.y : x.getY();
         x = (x.getX === undefined) ? x.x : x.getX();
      }
      let n = elements.length;
      for (let i = n - 1; i >= 0; i--) {
         if (elements[i].contains(x, y)) return elements[i];
      }
      return null;
   }

/*
 * Method: setAutoRepaintFlag
 * Usage: gw.setAutoRepaintFlag(flag);
 * -----------------------------------
 * Changes the setting of the auto-repaint flag.  By default, any change
 * to a graphical object contained in this canvas automatically triggers
 * a repaint of the canvas as a whole.  While this behavior makes it
 * easier to use the package, it has the disadvantage that repaint
 * requests come much more frequently than necessary.  You can disable
 * this feature by calling setAutoRepaintFlag(false), but you must then
 * make explicit calls to repaint() whenever you want to update the
 * display.  The advantage of this model is that you can then make many
 * different changes and have them all appear at once with a single
 * repaint call.
 */

   function setAutoRepaintFlag(flag) {
      autoRepaintFlag = flag;
   }

/*
 * Method: getAutoRepaintFlag
 * Usage: let flag = gw.getAutoRepaintFlag();
 * ------------------------------------------
 * Returns the setting of the auto-repaint flag.
 */

   function getAutoRepaintFlag() {
      return autoRepaintFlag;
   }

/*
 * Method: repaint
 * Usage: gw.repaint();
 * --------------------
 * Forces the window to repaint.  There is ordinarily no need to call
 * this method unless the auto-repaint flag is set to false.
 */

   function repaint() {
      _paint(canvas.getContext("2d"));
   }

/*
 * Method: getSize
 * Usage: let size = gw.getSize();
 * -------------------------------
 * Returns the size of the window as a GDimension object.
 */

   function getSize() {
      return GDimension(width, height);
   }

/*
 * Method: getWidth
 * Usage: let width = gw.getWidth();
 * ---------------------------------
 * Returns the width of the window in pixels.
 */

   function getWidth() {
      return width;
   }

/*
 * Method: getHeight
 * Usage: let height = gw.getHeight();
 * -----------------------------------
 * Returns the height of the window in pixels.
 */

   function getHeight() {
      return height;
   }

/*
 * Method: setScaleFactor
 * Usage: gw.setScaleFactor(sf);
 * -----------------------------
 * Sets a uniform scale factor for the GWindow.
 */

   function setScaleFactor(sf) {
      scaleFactor = sf;
   }

/*
 * Method: getScaleFactor
 * Usage: let sf = gw.getScaleFactor();
 * ------------------------------------
 * Returns the scale factor for the GWindow.
 */

   function getScaleFactor() {
      return scaleFactor;
   }

/* Protected methods */

   function _conditionalRepaint() {
      if (autoRepaintFlag) repaint();
   }

   function _updateMouseEvent(e) {
      let px = 0;
      let py = 0;
      if (e.pageX !== undefined) {
         px = e.pageX;
         py = e.pageY;
      } else if (e.clientX !== undefined) {
         px = e.clientX + document.body.scrollLeft +
                          document.documentElement.scrollLeft;
         py = e.clientY + document.body.scrollTop +
                          document.documentElement.scrollTop;
      }
      let obj = canvas;
      let cx = 0;
      let cy = 0;
      while (obj) {
         cx += obj.offsetLeft;
         cy += obj.offsetTop;
         obj = obj.offsetParent;
      }
      e.getX = function() { return px - cx; };
      e.getY = function() { return py - cy; };
   }

   function _paint(ctx) {
      ctx.save();
      if (bg) {
         ctx.fillStyle = bg;
         ctx.fillRect(0, 0, width, height);
      }
      ctx.scale(scaleFactor, scaleFactor);
      ctx.fillStyle = ctx.strokeStyle =fg;
      ctx.font = font;
      _paintComponent(ctx);
      ctx.restore();
   }

   function _paintComponent(ctx) {
      let n = elements.length;
      for (let i = 0; i < n; i++) {
         elements[i]._paint(ctx);
      }
   }

   function _sendToFront(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 0) {
         elements.splice(k, 1);
         elements.push(gobj);
         _conditionalRepaint();
      }
   }

   function _sendToBack(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 0) {
         elements.splice(k, 1);
         elements.unshift(gobj);
         _conditionalRepaint();
      }
   }

   function _sendForward(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 0 && k < elements.length - 1) {
         elements.splice(k, 1);
         elements.splice(k + 1, 0, gobj);
         _conditionalRepaint();
      }
   }

   function _sendBackward(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 1) {
         elements.splice(k, 1);
         elements.splice(k - 1, 0, gobj);
         _conditionalRepaint();
      }
   }

   let gw = {
      add: add,
      addEventListener: addEventListener,
      clear: clear,
      getAutoRepaintFlag: getAutoRepaintFlag,
      getElement: getElement,
      getElementAt: getElementAt,
      getElementCount: getElementCount,
      getHeight: getHeight,
      getScaleFactor: getScaleFactor,
      getSize: getSize,
      getWidth: getWidth,
      remove: remove,
      removeAll: removeAll,
      repaint: repaint,
      setAutoRepaintFlag: setAutoRepaintFlag,
      setScaleFactor: setScaleFactor,
      setSize: setSize,

/* Protected methods */

      _sendBackward: _sendBackward,
      _sendForward: _sendForward,
      _sendToBack: _sendToBack,
      _sendToFront: _sendToFront

   };

   if (width !== -1) setSize(width, height);
   let element = document.getElementById(id) || document.body;
   element.appendChild(canvas);

   return gw;
}

GWindow.CLICK_TOLERANCE = 1;

/*
 * Class: GObject
 * --------------
 * This class is the common superclass of all graphical objects that
 * can be displayed in a GWindow.  Because it is an abstract class,
 * you should not create a GObject directly but instead create one
 * of its concrete subclasses.
 */

function GObject() {
   let ctm = GTransform();
   let transformed = false;
   let x = 0;
   let y = 0;
   let width = 0;
   let height = 0;
   let fillFlag = false;
   let objectColor = "Black";
   let fillColor = null;
   let parent = null;
   let lineWidth = 1;
   let visible = true;

/*
 * Method: getBounds
 * Usage: let bounds = gobj.getBounds();
 * -------------------------------------
 * Returns the bounding box of this object, which is defined to be the
 * smallest rectangle that covers everything drawn by the figure.  The
 * origin of this rectangle will not necessarily match the location
 * of the object returned by getLocation.  The return value is of
 * type GRectangle.
 */

   function getBounds() {
      let r = gobj._getBounds(ctm);
      r.translate(x, y);
      return r;
   }

/*
 * Method: setLocation
 * Usage: gobj.setLocation(x, y);
 * ------------------------------
 * Sets the location of this object to the point (x, y).
 */

   function setLocation(a1, a2) {
      if (a2 === undefined) {
         x = _getX(a1);
         y = _getY(a1);
      } else {
         x = a1;
         y = a2;
      }
      repaint();
   }

/*
 * Method: getLocation
 * Usage: let pt = gobj.getLocation();
 * -----------------------------------
 * Returns the location of this object as a GPoint.
 */

   function getLocation() {
      return GPoint(x, y);
   }

/*
 * Method: getX
 * Usage: let x = gobj.getX();
 * ---------------------------
 * Returns the x coordinate of this object in pixels.
 */

   function getX() {
      return x;
   }

/*
 * Method: getY
 * Usage: let y = gobj.getY();
 * ---------------------------
 * Returns the y coordinate of this object in pixels.
 */

   function getY() {
      return y;
   }

/*
 * Method: move
 * Usage: gobj.move(dx, dy);
 * -------------------------
 * Moves this object by the displacements dx and dy.
 */

   function move(dx, dy) {
      x += dx;
      y += dy;
      repaint();
   }

/*
 * Method: movePolar
 * Usage: gobj.movePolar(r, theta);
 * --------------------------------
 * Moves this object r units in the direction theta, which is measured in
 * degrees counterclockwise from the +x axis.
 */

   function movePolar(r, theta) {
      let radians = theta * Math.PI / 180;
      move(r * Math.cos(radians), -r * Math.sin(radians));
   }

/*
 * Method: getSize
 * Usage: let size = gobj.getSize();
 * ---------------------------------
 * Returns the size of this object as a GDimension.
 */

   function getSize() {
      let bounds = getBounds();
      return GDimension(bounds.width, bounds.height);
   }

/*
 * Method: getWidth
 * Usage: let width = gobj.getWidth();
 * -----------------------------------
 * Returns the width of this object in pixels.
 */

   function getWidth() {
      return getBounds().width;
   }

/*
 * Method: getHeight
 * Usage: let height = gobj.getHeight();
 * -------------------------------------
 * Returns the height of this object in pixels.
 */

   function getHeight() {
      return getBounds().height;
   }

/*
 * Method: contains
 * Usage: if (gobj.contains(x, y)) . . .
 * -------------------------------------
 * Returns true is the object contains the point (x, y).
 */

   function contains(x, y) {
      if (y === undefined) {
         y = x.y;
         x = x.x;
      }
      let t = GTransform();
      t.translate(getX(), getY());
      t.concatenate(ctm);
      let pt = t.inverseTransform(x, y);
      return this._contains(pt.getX(), pt.getY());
   }

/*
 * Method: sendToFront
 * Usage: gobj.sendToFront();
 * --------------------------
 * Sends this object to the front of its container.
 */

   function sendToFront() {
      parent._sendToFront(gobj);
      if (mouseListenersEnabled) updateEnabledList();
   }

/*
 * Method: sendToBack
 * Usage: gobj.sendToBack();
 * -------------------------
 * Sends this object to the back of its container.
 */

   function sendToBack() {
      parent._sendToBack(gobj);
      if (mouseListenersEnabled) updateEnabledList();
   }

/*
 * Method: sendForward
 * Usage: gobj.sendForward();
 * --------------------------
 * Sends this object one step closer to the front of its container.
 */

   function sendForward() {
      parent._sendForward(gobj);
      if (mouseListenersEnabled) updateEnabledList();
   }

/*
 * Method: sendBackward
 * Usage: gobj.sendBackward();
 * ---------------------------
 * Sends this object one step closer to the back of its container.
 */

   function sendBackward() {
      parent._sendBackward(gobj);
      if (mouseListenersEnabled) updateEnabledList();
   }

/*
 * Method: setColor
 * Usage: gobj.setColor(color);
 * ----------------------------
 * Sets the color of this object.  The color is a string, which is either
 * the name of a predefined color in JavaScript or a string in the form
 * "#rrggbb" where rr, gg, and bb are the hexadecimal values of the red,
 * green, and blue intensities.
 */

   function setColor(color) {
      objectColor = color;
      repaint();
   }

/*
 * Method: getColor
 * Usage: let color = gobj.getColor();
 * -----------------------------------
 * Returns the color of this object.
 */

   function getColor() {
      return objectColor;
   }

/*
 * Method: setFillColor
 * Usage: gobj.setFillColor(color);
 * --------------------------------
 * Sets the color of this interior fill if this object is fillable.
 */

   function setFillColor(color) {
      fillColor = color;
      repaint();
   }

/*
 * Method: getFillColor
 * Usage: let color = gobj.getFillColor();
 * ---------------------------------------
 * Returns the color used to fill this object.
 */

   function getFillColor() {
      return fillColor;
   }

/*
 * Method: setFilled
 * Usage: gobj.setFilled(flag);
 * ----------------------------
 * Sets a flag showing that this object should be filled.  This method
 * applies only to fillable objects.
 */

   function setFilled(flag) {
      fillFlag = flag;
      repaint();
   }

/*
 * Method: isFilled
 * Usage: if (gobj.isFilled()) . . .
 * ---------------------------------
 * Returns the flag showing whether this object is filled.
 */

   function isFilled() {
      return fillFlag;
   }

/*
 * Method: setLineWidth
 * Usage: gobj.setLineWidth(width);
 * --------------------------------
 * Sets the width of the line used to draw the boundary of the object.
 */

   function setLineWidth(width) {
      lineWidth = width;
      repaint();
   }

/*
 * Method: getLineWidth
 * Usage: let width  = gobj.getLineWidth();
 * ----------------------------------------
 * Returns the width of the line used to draw the boundary of the object.
 */

   function getLineWidth() {
      return lineWidth;
   }

/*
 * Method: rotate
 * Usage: gobj.rotate(theta);
 * --------------------------
 * Rotates this object theta degrees counterclockwise around its origin.
 */

   function rotate(theta) {
      ctm.rotate(theta);
      transformed = true;
      repaint();
   }

/*
 * Method: scale
 * Usage: gobj.scale(sf);
 *        gobj.scale(sx, sy);
 * --------------------------
 * Scales this object by the specified scale factor.  The first form applies
 * the same scale factor in both dimensions; the second uses sx to scale
 * the horizontal dimension and sy to scale the vertical dimension.
 */

   function scale(sx, sy) {
      if (sy === undefined) {
         ctm.scale(sx, sx);
      } else {
         ctm.scale(sx, sy);
      }
      transformed = true;
      repaint();
   }

/*
 * Method: shear
 * Usage: gobj.shear(sx, sy);
 * --------------------------
 * Applies an affine shear transformation to the object using the scale
 * factors sx and sy.
 */

   function shear(sx, sy) {
      if (sy === undefined) {
         ctm.shear(sx, sx);
      } else {
         ctm.shear(sx, sy);
      }
      transformed = true;
      repaint();
   }

/*
 * Method: translate
 * Usage: gobj.translate(tx, ty);
 * ------------------------------
 * Translates the object by tx and ty before it is displayed.  Note that
 * the translate method does not change the object origin.
 */

   function translate(tx, ty) {
      ctm.translate(tx, ty);
      transformed = true;
      repaint();
   }

/*
 * Method: setVisible
 * Usage: gobj.setVisible(flag);
 * -----------------------------
 * Sets a flag showing whether this object is visible.
 */

   function setVisible(flag) {
      visible = flag;
      repaint();
   }

/*
 * Method: isVisible
 * Usage: if (gobj.isVisible()) . . .
 * ----------------------------------
 * Returns the flag showing whether this object is visible.
 */

   function isVisible() {
      return visible;
   }

/* Protected methods */

   function repaint() {
      if (parent) {
         if (parent._conditionalRepaint) {
            parent._conditionalRepaint();
         } else {
            parent.repaint();
         }
      }
   }

   function getCanvas() {
      let comp = gobj;
      while (comp._getParent) {
         comp = comp._getParent();
      }
      return comp;
   }

   function _getX(obj, def) {
      if (obj.getX !== undefined) return obj.getX();
      if (obj.x !== undefined) return obj.x;
      throw new Error("No x field defined in object");
   }

   function _getY(obj) {
      if (obj.getY !== undefined) return obj.getY();
      if (obj.y !== undefined) return obj.y;
      throw new Error("No y field defined in object");
   }

   function _getWidth(obj) {
      if (obj.getWidth !== undefined) return obj.getWidth();
      if (obj.width !== undefined) return obj.width;
      throw new Error("No width field defined in object");
   }

   function _getHeight(obj) {
      if (obj.getHeight !== undefined) return obj.getHeight();
      if (obj.height !== undefined) return obj.height;
      throw new Error("No height field defined in object");
   }

   function _getBounds(ctm) {
      throw new Error("No _getBounds method defined");
   }

   function _contains(x, y) {
      throw new Error("No _contains method defined");
   }

   function _paint(ctx) {
      if (visible) {
         ctx.save();
         ctx.translate(x, y);
         ctx.transform(ctm.a, ctm.b, ctm.c, ctm.d, ctm.tx, ctm.ty);
         ctx.lineWidth = lineWidth;
         gobj._paintTransformed(ctx);
         ctx.restore();
      }
   }

   function _getParent() {
      return parent;
   }

   function _setParent(comp) {
      parent = comp;
   }

   function _getTransform() {
      return ctm;
   }

   function _isTransformed() {
      return transformed;
   }
      
   let gobj = {
      contains: contains,
      getBounds: getBounds,
      getCanvas: getCanvas,
      getColor: getColor,
      getFillColor: getFillColor,
      getHeight: getHeight,
      getLineWidth: getLineWidth,
      getLocation: getLocation,
      getSize: getSize,
      getWidth: getWidth,
      getX: getX,
      getY: getY,
      isFilled: isFilled,
      isVisible: isVisible,
      move: move,
      movePolar: movePolar,
      repaint: repaint,
      rotate: rotate,
      scale: scale,
      sendBackward: sendBackward,
      sendForward: sendForward,
      sendToBack: sendToBack,
      sendToFront: sendToFront,
      setColor: setColor,
      setFillColor: setFillColor,
      setFilled: setFilled,
      setLineWidth: setLineWidth,
      setLocation: setLocation,
      setVisible: setVisible,
      shear: shear,
      translate: translate,

/* Protected methods */

      _getX: _getX,
      _getY: _getY,
      _getWidth: _getWidth,
      _getHeight: _getHeight,
      _contains: _contains,
      _getBounds: _getBounds,
      _getParent: _getParent,
      _getTransform: _getTransform,
      _isTransformed: _isTransformed,
      _paint: _paint,
      _setParent: _setParent

   };

   return gobj;
}

/*
 * Class: GLabel
 * -------------
 * The GLabel class is a graphical object whose appearance consists of a
 * text string.
 */

/*
 * Factory method: GLabel
 * Usage: let label = GLabel(str);
 *        let label = GLabel(str, x, y);
 * -------------------------------------
 * Creates a GLabel object containing the specified string.  The parameters
 * x and y indicate the baseline origin of the string; if these are omitted,
 * the string is positioned at (0, 0).
 */

function GLabel(str, x, y) {

   let glabel = GObject();
   let fontTag = GLabel.DEFAULT_SIZE + "px " +
                 GLabel.STANDARD_FONTS[GLabel.DEFAULT_FAMILY.toLowerCase()];
   let font = fontTag;
   let label = str;
   if (x !== undefined) glabel.setLocation(x, y);
   if (GLabel.ctx === undefined) {
      GLabel.ctx = document.createElement("canvas").getContext("2d");
   }

/*
 * Method: setFont
 * Usage: label.setFont(str);
 * --------------------------
 * Sets the font used for the label.  The label should be specified
 * as using the CSS form of the font specification.  For backward
 * compatibility, this method also accepts font names in the Java form.
 */

   glabel.setFont = function(str) {
      font = str;
      let h1 = str.indexOf("-");
      if (h1 === -1) {
         fontTag = str;
      } else {
         let family = str.substring(0, h1);
         let style = "";
         let size = 0;
         let h2 = str.indexOf("-", h1 + 1);
         if (h2 === -1) {
            size = parseInt(str.substring(h1 + 1));
         } else {
            style = str.substring(h1 + 1, h2).toLowerCase();
            size = parseInt(str.substring(h2 + 1));
         }
         let std = GLabel.STANDARD_FONTS[family.toLowerCase()];
         fontTag = (style.indexOf("italic") === -1) ? "normal" : "italic";
         if (style.indexOf("bold") >= 0) fontTag += " bold";
         fontTag += " " + size + "px" + " ";
         fontTag += (std === undefined) ? family : std;
      }
      glabel.repaint();
   };

/*
 * Method: getFont
 * Usage: let str = label.getFont();
 * ---------------------------------
 * Returns the font string last used to set the font for this label.
 */

   glabel.getFont = function() {
      return font;
   };

/*
 * Method: setLabel
 * Usage: label.setLabel(str);
 * ---------------------------
 * Sets the string displayed by thi label.
 */

   glabel.setLabel = function(str) {
      label = str;
      glabel.repaint();
   };

/*
 * Method: getLabel
 * Usage: let str = label.getLabel();
 * ----------------------------------
 * Returns the string displayed by this label.
 */

   glabel.getLabel = function() {
      return label;
   };

/*
 * Method: getAscent
 * Usage: let ascent = label.getAscent();
 * --------------------------------------
 * Returns the ascent of this font, which is the maximum distance characters
 * extend above the baseline.  In JavaScript, this value is estimated from
 * the point size.
 */

   glabel.getAscent = function() {
      return Math.round(GLabel.ASCENT_SF * getPointSizeInPixels());
   };

/*
 * Method: getDescent
 * Usage: let descent = label.getDescent();
 * ----------------------------------------
 * Returns the descent of this font, which is the maximum distance characters
 * extend below the baseline.  In JavaScript, this value is estimated from
 * the point size.
 */

   glabel.getDescent = function() {
      return Math.round(GLabel.DESCENT_SF * getPointSizeInPixels());
   };

   glabel._paintTransformed = function(ctx) {
      ctx.font = fontTag;
      ctx.fillStyle = glabel.getColor();
      ctx.fillText(label, 0, 0);
   };

   glabel._getBounds = function(ctm) {
      GLabel.ctx.font = fontTag;
      let y0 = -glabel.getAscent();
      let width = GLabel.ctx.measureText(label).width;
      let height = Math.round(GLabel.HEIGHT_SF * getPointSizeInPixels());
      let bb = new GRectangle(ctm.transform(0, y0));
      bb.add(ctm.transform(width, y0));
      bb.add(ctm.transform(0, y0 + height));
      bb.add(ctm.transform(width, y0 + height));
      return bb;
   };

   glabel._contains = function(x, y) {
      GLabel.ctx.font = fontTag;
      let y0 = -glabel.getAscent();
      let width = GLabel.ctx.measureText(label).width;
      let height = Math.round(GLabel.HEIGHT_SF * getPointSizeInPixels());
      return x >= 0 && x < width && y >= y0 && y < y0 + height;
   };

   glabel.toString = function() {
     return "GLabel(" + label + ", " + glabel.getX() + ", " +
                                       glabel.getY() + ")";
   };

   function getPointSizeInPixels() {
      let tokens = fontTag.split(" ");
      let nTokens = tokens.length;
      for (let i = 0; i < nTokens; i++) {
         let token = tokens[i];
         let units = getUnitMarker(token);
         let cf = GLabel.STANDARD_UNITS[units];
         if (cf !== undefined) {
            let num = token.substring(0, token.length - units.length);
            return parseFloat(num) * cf;
         }
      }
      return GLabel.DEFAULT_SIZE;
   }

   function getUnitMarker(str) {
      for (let i = str.length - 1; i >= 0; i--) {
         let ch = str.charAt(i);
         if (ch === "." || (ch >= "0" && ch <= "9")) {
            return str.substring(i + 1);
         }
      }
      return str;
   }

   return glabel;

}

GLabel.DEFAULT_FAMILY = "SansSerif";
GLabel.DEFAULT_SIZE = 12;
GLabel.HEIGHT_SF = 1.15;
GLabel.ASCENT_SF = 0.75;
GLabel.DESCENT_SF = 0.20;

GLabel.STANDARD_FONTS = {
   "serif": "'Times New Roman',Times,Serif",
   "sansserif": "'Helvetica Neue',Helvetica,Arial,SansSerif",
   "sans-serif": "'Helvetica Neue',Helvetica,Arial,SansSerif",
   "monospaced": "'Courier New',Courier,Monospaced"
};  
GLabel.STANDARD_UNITS = {
   "em": 16,       // Fix this someday
   "px": 1,
   "pt": 96 / 72,
   "in": 96,
   "cm": 96 / 2.54
};

/*
 * Class: GPolygon
 * ---------------
 * This class is a graphical object whose appearance consists of a polygon.
 */

/*
 * Factory method: GPolygon
 * Usage: let poly = GPolygon();
 *        let poly = GPolygon(x, y);
 * ---------------------------------
 * Creates an empty GPolygon object.  If the values x and y are supplied,
 * the origin of the polygon is moved to the point (x, y).
 */

function GPolygon(x, y) {

   let gpoly = GObject();
   let vertices = [];
   let cx = 0;
   let cy = 0;
   if (x !== undefined) gpoly.setLocation(x, y);

/*
 * Method: addVertex
 * Usage: poly.addVertex(x, y);
 * ----------------------------
 * Adds a vertex at (x, y) relative to the polygon origin.
 */

   gpoly.addVertex = function(x, y) {
      if (y === undefined) {
         y = x.y;
         x = x.x;
      }
      cx = x;
      cy = y;
      vertices.push(GPoint(x, y));
   };

/*
 * Method: addEdge
 * Usage: poly.addEdge(dx, dy);
 * ----------------------------
 * Adds a vertex at the point which is shifted by dx and dy from the
 * previous vertex.
 */

   gpoly.addEdge = function(dx, dy) {
      gpoly.addVertex(cx + dx, cy + dy);
   };

/*
 * Method: addPolarEdge
 * Usage: poly.addPolarEdge(r, theta);
 * -----------------------------------
 * Adds a vertex at the point which is shifted by r units in the direction
 * theta from the previous vertex.  The parameter theta is measured in
 * degrees counterclockwise from the +x axis.
 */

   gpoly.addPolarEdge = function(r, theta) {
      gpoly.addEdge(r * GMath.cosDegrees(theta), -r * GMath.sinDegrees(theta));
   };

/*
 * Method: getCurrentPoint
 * Usage: let pt = poly.getCurrentPoint();
 * ---------------------------------------
 * Returns the most recent vertex added to the polygon as a GPoint.
 */

   gpoly.getCurrentPoint = function() {
      return GPoint(cx, cy);
   };

   gpoly._getBounds = function(ctm) {
      let nPoints = vertices.length;
      if (nPoints === 0) return GRectangle();
      let bb = GRectangle(ctm.transform(vertices[0]));
      for (let i = 1; i < nPoints; i++) {
         bb.add(ctm.transform(vertices[i]));
      }
      return bb;
   };

   gpoly._contains = function(x, y) {
      let nPoints = vertices.length;
      let isContained = false;
      for (let i = 0; i < nPoints; i++) {
         let v1 = vertices[i];
         let v2 = vertices[(i + 1) % nPoints];
         if (((v1.y < y) && (v2.y >= y)) || ((v2.y < y) && (v1.y >= y))) {
            let t = (y - v1.y) / (v2.y - v1.y);
            let xp = v1.x + t * (v2.x - v1.x);
            if (xp < x) isContained = !isContained;
         }
      }
      return isContained;
   };

   gpoly._paintTransformed = function(ctx) {
      ctx.beginPath();
      for (let i = 0; i < vertices.length; i++) {
         let pt = vertices[i];
         if (i === 0) {
            ctx.moveTo(pt.x, pt.y);
         } else {
            ctx.lineTo(pt.x, pt.y);
         }
      }
      ctx.closePath();
      if (gpoly.isFilled()) {
         let fillColor = gpoly.getFillColor();
         if (!fillColor) fillColor = gpoly.getColor();
         ctx.fillStyle = fillColor;
         ctx.fill();
      }
      ctx.strokeStyle = gpoly.getColor();
      ctx.stroke();
   };

   gpoly.toString = function() {
     return "GPolygon(" + vertices.length + " edges)";
   };

   return gpoly;

}

/*
 * Class: GTransform
 * -----------------
 * This class is used to implement affine transformations.  The methods
 * have the same structure as in the AffineTransformation class in Java.
 */

function GTransform(a1, a2, a3, a4, a5, a6) {

   const ZERO_RADIUS = 1.0E-10;

   function concatenate(t) {
      setTransform(ctm.a * t.a + ctm.c * t.b,
                   ctm.b * t.a + ctm.d * t.b,
                   ctm.a * t.c + ctm.c * t.d,
                   ctm.b * t.c + ctm.d * t.d,
                   ctm.a * t.tx + ctm.c * t.ty + ctm.tx,
                   ctm.b * t.tx + ctm.d * t.ty + ctm.ty);
   }

   function createInverse() {
      let det = getDeterminant();
      if (det === 0) throw new Error("Noninvertible transform");
      return GTransform(ctm.d / det,
                        -ctm.b / det,
                        -ctm.c / det,
                        ctm.a / det,
                        (ctm.c * ctm.ty - ctm.tx * ctm.d) / det,
                        (ctm.b * ctm.tx - ctm.a * ctm.ty) / det);
   }

   function getDeterminant() {
      return ctm.a * ctm.d - ctm.b * ctm.c;
   }

   function getScaleX() {
      return ctm.a;
   }

   function getScaleY() {
      return ctm.d;
   }

   function getShearX() {
      return ctm.c;
   }

   function getShearY() {
      return ctm.b;
   }

   function getTranslateX() {
      return ctm.tx;
   }

   function getTranslateY() {
      return ctm.ty;
   }

   function inverseTransform(a1, a2) {
      if (a2 === undefined) {
         return createInverse().transform(a1);
      } else {
         return createInverse().transform(a1, a2);
      }
   }

   function rotate(theta) {
      let cosTheta = Math.cos(-theta * Math.PI / 180);
      let sinTheta = Math.sin(-theta * Math.PI / 180);
      if (Math.abs(cosTheta) < ZERO_RADIUS) cosTheta = 0;
      if (Math.abs(sinTheta) < ZERO_RADIUS) sinTheta = 0;
      setTransform(ctm.a * cosTheta + ctm.c * sinTheta,
                   ctm.b * cosTheta + ctm.d * sinTheta,
                   ctm.c * cosTheta - ctm.a * sinTheta,
                   ctm.d * cosTheta - ctm.b * sinTheta,
                   ctm.tx, ctm.ty);
   }

   function scale(sx, sy) {
      ctm.a *= sx;
      ctm.b *= sx;
      ctm.c *= sy;
      ctm.d *= sy;
   }

   function setTransform(a, b, c, d, tx, ty) {
      ctm.a = a;
      ctm.b = b;
      ctm.c = c;
      ctm.d = d;
      ctm.tx = tx;
      ctm.ty = ty;
   }

   function shear(sx, sy) {
      setTransform(ctm.a + (sy * ctm.c),
                   ctm.b + (sx * ctm.a),
                   ctm.c + (sy * ctm.d),
                   ctm.d + (sx * ctm.b),
                   ctm.tx, ctm.ty);
   }

   function transform(x, y) {
      if (y === undefined) {
         y = (x.getY === undefined) ? x.y : x.getY();
         x = (x.getX === undefined) ? x.x : x.getX();
      }
      return GPoint(ctm.a * x + ctm.c * y + ctm.tx,
                    ctm.b * x + ctm.d * y + ctm.ty);
   }

   function translate(tx, ty) {
      ctm.tx += tx * ctm.a + ty * ctm.c;
      ctm.ty += tx * ctm.b + ty * ctm.d;
   }

   function toString() {
      return "[" + ctm.a + ", " + ctm.b + ", " + ctm.c + ", " +
                   ctm.d + ", " + ctm.tx + ", " + ctm.ty + "]";
   }

   let ctm = {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: 0,
      ty: 0,
      concatenate: concatenate,
      createInverse: createInverse,
      getDeterminant: getDeterminant,
      getScaleX: getScaleX,
      getScaleY: getScaleY,
      getShearX: getShearX,
      getShearY: getShearY,
      getTranslateX: getTranslateX,
      getTranslateY: getTranslateY,
      inverseTransform: inverseTransform,
      rotate: rotate,
      scale: scale,
      setTransform: setTransform,
      shear: shear,
      transform: transform,
      translate: translate,
      toString: toString
   };
      
   if (a1 === undefined) {
      setTransform(1, 0, 0, 1, 0, 0);
   } else if (a2 === undefined) {
      setTransform(a1.a, a1.b, a1.c, a1.d, a1.tx, a1.ty);
   } else if (a5 === undefined) {
      setTransform(a1, a2, a3, a4, 0, 0);
   } else {
      setTransform(a1, a2, a3, a4, a5, a6);
   }

   return ctm;
}

/*
 * Class: GOval
 * ------------
 * This class is a graphical object whose appearance consists of an oval.
 */

/*
 * Factory method: GOval
 * Usage: let oval = GOval(width, height);
 *        let oval = GOval(x, y, width, height);
 * ---------------------------------------------
 * Creates a new GOval object that fits inside the specified bounds.  If
 * not supplied, the values of x and y default to 0.
 */

function GOval(x, y, width, height) {

   let goval = GObject();
   if (width === undefined) {
      width = x;
      height = y;
      x = 0;
      y = 0;
   }
   goval.setLocation(x, y);

/*
 * Method: setSize
 * Usage: oval.setSize(width, height);
 * -----------------------------------
 * Resets the dimensions of the GOval as specified.
 */

   goval.setSize = function(a1, a2) {
      if (goval._isTransformed()) {
         throw new Error("setSize called on transformed object");
      }
      if (a2 === undefined) {
         width = goval._getWidth(a1);
         height = goval._getHeight(a1);
      } else {
         width = a1;
         height = a2;
      }
   };

/*
 * Method: setBounds
 * Usage: oval.setBounds(x, y, width, height);
 * -------------------------------------------
 * Resets the bounds of the GOval as specified.
 */

   goval.setBounds = function(a1, a2, a3, a4) {
      if (goval._isTransformed()) {
         throw new Error("setBounds called on transformed object");
      }
      if (a2 === undefined) {
         width = goval._getWidth(a1);
         height = goval._getHeight(a1);
         goval.setLocation(goval._getX(a1), goval._getY(a1));
      } else if (a3 === undefined) {
         width = goval._getWidth(a2);
         height = goval._getHeight(a2);
         goval.setLocation(goval._getX(a1), goval._getY(a1));
      } else {
         width = a3;
         height = a4;
         goval.setLocation(a1, a2);
      }
   };

   goval.toString = function() {
      let x = goval.getX();
      let y = goval.getY();
      return "GOval(" + x + ", " + y + ", " + width + ", " + height + ")";
   };

   goval._getBounds = function(ctm) {
      let bb = GRectangle(ctm.transform(0, 0));
      bb.add(ctm.transform(width, 0));
      bb.add(ctm.transform(0, height));
      bb.add(ctm.transform(width, height));
      return bb;
   };

   goval._contains = function(x, y) {
      let rx = width / 2;
      let ry = height / 2;
      let tx = x - rx;
      let ty = y - ry;
      return (tx * tx) / (rx * rx) + (ty * ty) / (ry * ry) <= 1.0;
   };

   goval._paintTransformed = function(ctx) {
      let x = goval.getX();
      let y = goval.getY();
      ctx.translate(width / 2, height / 2);
      ctx.scale(1, height / width);
      ctx.beginPath();
      ctx.arc(0, 0, width / 2, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.scale(1, width / height);
      if (goval.isFilled()) {
         let fillColor = goval.getFillColor();
         if (!fillColor) fillColor = goval.getColor();
         ctx.fillStyle = fillColor;
         ctx.fill();
      }
      ctx.strokeStyle = goval.getColor();
      ctx.stroke();
   };

   return goval;

};

/*
 * Class: GRect
 * ------------
 * This class is a graphical object whose appearance consists of a rectangle..
 */

/*
 * Factory method: GRect
 * Usage: let rect = GRect(width, height);
 *        let rect = GRect(x, y, width, height);
 * ---------------------------------------------
 * Creates a new GRect object with the specified bounds.  If not supplied,
 * the values of x and y default to 0.
 */

function GRect(x, y, width, height) {

   let grect = GObject();
   if (width === undefined) {
      width = x;
      height = y;
      x = 0;
      y = 0;
   }
   grect.setLocation(x, y);

/*
 * Method: setSize
 * Usage: rect.setSize(width, height);
 * -----------------------------------
 * Resets the dimensions of the GRect as specified.
 */

   grect.setSize = function(a1, a2) {
      if (grect._isTransformed()) {
         throw new Error("setSize called on transformed object");
      }
      if (a2 === undefined) {
         width = grect._getWidth(a1);
         height = grect._getHeight(a1);
      } else {
         width = a1;
         height = a2;
      }
   };

/*
 * Method: setBounds
 * Usage: rect.setBounds(x, y, width, height);
 * -------------------------------------------
 * Resets the bounds of the GRect as specified.
 */

   grect.setBounds = function(a1, a2, a3, a4) {
      if (grect._isTransformed()) {
         throw new Error("setBounds called on transformed object");
      }
      if (a2 === undefined) {
         width = grect._getWidth(a1);
         height = grect._getHeight(a1);
         grect.setLocation(grect._getX(a1), grect._getY(a1));
      } else if (a3 === undefined) {
         width = grect._getWidth(a2);
         height = grect._getHeight(a2);
         grect.setLocation(grect._getX(a1), grect._getY(a1));
      } else {
         width = a3;
         height = a4;
         grect.setLocation(a1, a2);
      }
   };

   grect.toString = function() {
      let x = grect.getX();
      let y = grect.getY();
      return "GRect(" + x + ", " + y + ", " + width + ", " + height + ")";
   };

   grect._getBounds = function(ctm) {
      let bb = GRectangle(ctm.transform(0, 0));
      bb.add(ctm.transform(width, 0));
      bb.add(ctm.transform(0, height));
      bb.add(ctm.transform(width, height));
      return bb;
   };

   grect._contains = function(x, y) {
      return (x > 0) && (x <= width) && (y > 0) && (y <= height);
   };

   grect._paintTransformed = function(ctx) {
      if (grect.isFilled()) {
         let fillColor = grect.getFillColor();
         if (!fillColor) fillColor = grect.getColor();
         ctx.fillStyle = fillColor;
         ctx.fillRect(0, 0, width, height);
      }
      ctx.strokeStyle = grect.getColor();
      ctx.strokeRect(0, 0, width, height);
   };

   return grect;

};

/*
 * Class: GLine
 * ------------
 * This class is a graphical object whose appearance consists of a line
 * segment.
 */

/*
 * Factory method: GLine
 * Usage: let line = GLine(x0, y0, x1, y1);
 * ----------------------------------------
 * Creates a GLine object that connects the points (x0, y0) and (x1, y1).
 */

function GLine(x0, y0, x1, y1) {

   const LINE_TOLERANCE = 1.5;

   let gline = GObject();
   gline.setLocation(x0, y0);
   let dx = x1 - x0;
   let dy = y1 - y0;

   function distanceSquared(x0, y0, x1, y1) {
      return (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
   }

/*
 * Method: setStartPoint
 * Usage: line.setStartPoint(x, y);
 * --------------------------------
 * Sets the initial point of the line to (x, y), leaving the end point
 * unchanged.  This method is therefore different from setLocation, which
 * moves both components of the line segment.
 */

   gline.setStartPoint = function(a1, a2) {
      let x = (a2 === undefined) ? gline._getX(a1) : a1;
      let y = (a2 === undefined) ? gline._getY(a1) : a2;
      let ctm = gline._getTransform(); 
      let pt = ctm.transform(dx, dy);
      pt.setLocation(pt.x - gline.getX(), pt.y - gline.getY());
      pt = ctm.inverseTransform(pt);
      dx = pt.x;
      dy = pt.y;
      gline.setLocation(x, y);
   };

/*
 * Method: getStartPoint
 * Usage: let pt = line.getStartPoint();
 * -------------------------------------
 * Returns the initial point of the line as a GPoint object.
 */

   gline.getStartPoint = function() {
      return gline.getLocation();
   };

/*
 * Method: setEndPoint
 * Usage: line.setEndPoint(x, y);
 * ------------------------------
 * Sets the end point of the line to (x, y), leaving the start point
 * unchanged.
 */

   gline.setEndPoint = function(a1, a2) {
      let x = (a2 === undefined) ? gline._getX(a1) : a1;
      let y = (a2 === undefined) ? gline._getY(a1) : a2;
      let ctm = gline._getTransform(); 
      let pt = ctm.inverseTransform(x - gline.getX(), y - gline.getY());
      dx = pt.x;
      dy = pt.y;
      gline.repaint();
   };

/*
 * Method: getEndPoint
 * Usage: let pt = line.getEndPoint();
 * -----------------------------------
 * Returns the end point of the line as a GPoint object.
 */

   gline.getEndPoint = function() {
      let ctm = gline._getTransform(); 
      let pt = ctm.transform(dx, dy);
      return GPoint(gline.getX() + pt.x, gline.getY() + pt.y);
   };

   gline.toString = function() {
      let x0 = gline.getX();
      let y0 = gline.getY();
      let x1 = x0 + dx;
      let y1 = y0 + dy;
      return "GLine(" + x0  + ", " + y0 + ", " + x1 + ", " + y1 + ")";
   }

   gline._getBounds = function(ctm) {
      let bb = GRectangle(ctm.transform(0, 0));
      bb.add(ctm.transform(dx, dy));
      return bb;
   };

   gline._contains = function(x, y) {
      let tSquared = LINE_TOLERANCE * LINE_TOLERANCE;
      if (distanceSquared(x, y, 0, 0) < tSquared) return true;
      if (distanceSquared(x, y, dx, dy) < tSquared) return true;
      if (x < Math.min(0, dx) - LINE_TOLERANCE) return false;
      if (x > Math.max(0, dx) + LINE_TOLERANCE) return false;
      if (y < Math.min(0, dy) - LINE_TOLERANCE) return false;
      if (y > Math.max(0, dy) + LINE_TOLERANCE) return false;
      if (dx === 0 && dy === 0) return false;
      let u = (x * dx + y * dy) / distanceSquared(0, 0, dx, dy);
      return distanceSquared(x, y, u * dx, u * dy) <= tSquared;
   };

   gline._paintTransformed = function(ctx) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(dx, dy);
      ctx.strokeStyle = gline.getColor();
      ctx.stroke();
   }

   return gline;

}

/*
 * Class: GArc
 * -----------
 * This class is a graphical object whose appearance consists of an arc.
 * If unfilled, the arc is simply a portion of the circumference of an
 * ellipse; if filled, the arc is a pie-shaped wedge connected to the
 * center of the figure.
 */

/*
 * Factory method: GArc
 * Usage: let arc = GArc(width, height, start, sweep);
 *        let arc = GArc(x, y, width, height, start, sweep);
 * ---------------------------------------------------------
 * Creates a GArc object consisting of an elliptical arc that fits inside
 * the bounding box specified by x, y, width, and height.  If x and y are
 * missing, they default to 0. The start parameter indicates the angle at
 * which the arc begins and is measured in degrees counterclockwise from
 * the +x axis.  Thus, a start angle of 0 indicates an arc that begins
 * along the line running eastward from the center, a start angle of 135
 * begins along the line running northwest, and a start angle of -90
 * begins along the line running south.  The sweep parameter indicates
 * the extent of the arc and is also measured in degrees counterclockwise.
 * A sweep angle of 90 defines a quarter circle extending counterclockwise
 * from the start angle, and a sweep angle of -180 defines a semicircle
 * extending clockwise.
 */

function GArc(a1, a2, a3, a4, a5, a6) {

   const ARC_TOLERANCE = 2.5;

   let garc = GObject();
   let width = (a5 === undefined) ? a1 : a3;
   let height = (a5 === undefined) ? a2 : a4;
   let startAngle = (a5 === undefined) ? a3 : a5;
   let sweepAngle = (a5 === undefined) ? a4 : a6;
   if (a5 !== undefined) garc.setLocation(a1, a2);

/*
 * Method: setStartAngle
 * Usage: arc.setStartAngle(start);
 * --------------------------------
 * Sets the starting angle for this GArc object.
 */

   garc.setStartAngle = function(start) {
      startAngle = start;
      garc.repaint();
   };

/*
 * Method: getStartAngle
 * Usage: let start = arc.getStartAngle();
 * ---------------------------------------
 * Returns the starting angle for this GArc object.
 */

   garc.getStartAngle = function() {
      return startAngle;
   };

/*
 * Method: setSweepAngle
 * Usage: arc.setSweepAngle(sweep);
 * --------------------------------
 * Sets the sweep angle for this GArc object.
 */

   garc.setSweepAngle = function(sweep) {
      sweepAngle = sweep;
      garc.repaint();
   };

/*
 * Method: getSweepAngle
 * Usage: let sweep = arc.getSweepAngle();
 * ---------------------------------------
 * Returns the sweep angle for this GArc object.
 */

   garc.getSweepAngle = function() {
      return sweepAngle;
   };

/*
 * Method: getStartPoint
 * Usage: let pt = arc.getStartPoint();
 * ------------------------------------
 * Returns the point at which the arc starts.
 */

   garc.getStartPoint = function() {
      let pt = garc._getTransform(getArcPoint(startAngle));
      pt.translate(garc.getX(), garc.getY());
      return pt;
   };

/*
 * Method: getEndPoint
 * Usage: let pt = arc.getEndPoint();
 * ----------------------------------
 * Returns the point at which the arc ends.
 */

   garc.getEndPoint = function() {
      let pt = garc._getTransform(getArcPoint(startAngle + sweepAngle));
      pt.translate(garc.getX(), garc.getY());
      return pt;
   };

/*
 * Method: setFrameRectangle
 * Usage: arc.setFrameRectangle(x, y, width, height);
 * --------------------------------------------------
 * Resets the dimensions of the framing rectangle for this GArc.
 */

   garc.setFrameRectangle = function(a1, a2, a3, a4) {
      if (a2 === undefined) {
         garc.setLocation(garc._getX(a1), gob._getY(a1));
         width = garc._getWidth(a1);
         height = garc._getHeight(a1);
      } else {
         garc.setLocation(a1, a2);
         width = a3;
         height = a4;
      }
      garc.repaint();
   };

/*
 * Method: getFrameRectangle
 * Usage: let rect = arc.getFrameRectangle();
 * ------------------------------------------
 * Returns a GRectangle that describes the framing rectangle for this GArc.
 */

   garc.getFrameRectangle = function() {
      return GRectangle(garc.getX(), garc.getY(), width, height);
   };

   garc.toString = function() {
      return "GArc(" + garc.getX() + ", " + garc.getY() + ", " +
                       width + ", " + height + ", " +
                       startAngle + ", " + sweepAngle + ")";
   };

   garc._getBounds = function(ctm) {
      let bb = GRectangle(ctm.transform(getArcPoint(startAngle)));
      bb.add(ctm.transform(getArcPoint(startAngle + sweepAngle)));
      let rx = width / 2;
      let ry = height / 2;
      let a = ctm.getScaleX();
      let b = ctm.getShearY();
      let c = ctm.getShearX();
      let d = ctm.getScaleY();
      let tx = Math.atan2(c * height, a * width);
      let ty = Math.atan2(d * height, b * width);
      for (let i = 0; i < 4; i++) {
         let t1 = tx + i * Math.PI / 2;
         let t2 = ty + i * Math.PI / 2;
         if (containsAngle(GMath.toDegrees(t1))) {
            bb.add(ctm.transform(rx + rx * Math.cos(t1),
                                 ry - ry * Math.sin(t1)));
         }
         if (containsAngle(GMath.toDegrees(t2))) {
            bb.add(ctm.transform(rx + rx * Math.cos(t2),
                                 ry - ry * Math.sin(t2)));
         }
      }
      if (garc.isFilled()) bb.add(ctm.transform(rx, ry));
      return bb;
   };

   garc._contains = function(x, y) {
      let rx = width / 2;
      let ry = height / 2;
      if (rx === 0 || ry === 0) return false;
      let dx = x - rx;
      let dy = y - ry;
      let r = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
      if (garc.isFilled()) {
         if (r > 1.0) return false;
      } else {
         let t = ARC_TOLERANCE / ((rx + ry) / 2);
         if (Math.abs(1.0 - r) > t) return false;
      }
      return containsAngle(GMath.toDegrees(Math.atan2(-dy, dx)));
   };

   garc._paintTransformed = function(ctx) {
      ctx.translate(width / 2, height / 2);
      ctx.scale(1, height / width);
      ctx.beginPath();
      let t1 = -GMath.toRadians(startAngle);
      let t2 = -GMath.toRadians(startAngle + sweepAngle);
      ctx.arc(0, 0, width / 2, t1, t2, true);
      if (garc.isFilled()) {
         ctx.lineTo(0, 0);
         ctx.closePath();
      }
      ctx.scale(1, width / height);
      if (garc.isFilled()) {
         let fillColor = garc.getFillColor();
         if (!fillColor) fillColor = garc.getColor();
         ctx.fillStyle = fillColor;
         ctx.fill();
      }
      ctx.strokeStyle = garc.getColor();
      ctx.stroke();
   };

   function getArcPoint(angle) {
      let rx = width / 2;
      let ry = height / 2;
      return GPoint(rx + rx * GMath.cosDegrees(angle),
                    ry - ry * GMath.sinDegrees(angle));
   }

   function containsAngle(theta) {
      let start = Math.min(startAngle, startAngle + sweepAngle);
      let sweep = Math.abs(sweepAngle);
      if (sweep >= 360) return true;
      theta = (theta < 0) ? 360 - (-theta % 360) : theta % 360;
      start = (start < 0) ? 360 - (-start % 360) : start % 360;
      if (start + sweep > 360) {
         return theta >= start || theta <= start + sweep - 360;
      } else {
         return theta >= start && theta <= start + sweep;
      }
   }

   return garc;

}
 
/*
 * Class: GCompound
 * ----------------
 * This class defines a graphical object that consists of a collection
 * of other graphical objects.  Once assembled, the internal objects
 * can be manipulated as a unit.
 */

/*
 * Factory method: GCompound
 * Usage: let comp = GCompound();
 *        let comp = GCompound(x, y);
 * ----------------------------------
 * Creates an empty GCompound object.  If the values x and y are supplied,
 * the origin of the compound is moved to the point (x, y).
 */

function GCompound(a1, a2) {
   let gcomp = GObject();
   let elements = [];
   if (a1 !== undefined) gcomp.setLocation(a1, a2);

/*
 * Method: add
 * Usage: comp.add(gobj);
 *        comp.add(gobj, x, y);
 * ----------------------------
 * Adds the specified GObject to the compound at the location previously
 * stored in the object.  If x and y are supplied, the object is moved
 * to the specified location.
 */

   gcomp.add = function(gobj, x, y) {
      elements.push(gobj);
      if (x !== undefined) {
         if (y === undefined) {
            y = gcomp._getY(x);
            x = gcomp._getX(x);
         }
         gobj.setLocation(x, y);
      }
      gobj._setParent(gcomp);
      gcomp.repaint();
   };

/*
 * Method: remove
 * Usage: comp.remove(gobj);
 * -------------------------
 * Removes the specified GObject from the compound.  If the object is not
 * installed in the compound, this method has no effect.
 */

   gcomp.remove = function(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 0) elements.splice(k, 1);
      gobj._setParent(null);
      gcomp.repaint();
   };

/*
 * Method: removeAll
 * Usage: comp.removeAll();
 * ------------------------
 * Removes all GObjects from the compound
 */

   gcomp.removeAll = function() {
      for (let i = 0; i < elements.length; i++) {
         elements[i]._setParent(null);
      }
      elements = [];
      gcomp.repaint();
   };

/*
 * Method: getElementCount
 * Usage: let count = comp.getElementCount();
 * ------------------------------------------
 * Returns the number of graphical objects stored in this GCompound
 */

   gcomp.getElementCount = function() {
      return elements.length;
   };

/*
 * Method: getElement
 * Usage: let gobj = comp.getElement(index);
 * -----------------------------------------
 * Returns the graphical object at the specified index, numbering from back
 * to front in the the z dimension.
 */

   gcomp.getElement = function(index) {
      return elements[index];
   };

/*
 * Method: getElementAt
 * Usage: let gobj = comp.getElementAt(x, y);
 * ------------------------------------------
 * Returns the topmost graphical object that contains the point (x, y)
 * or null if no such object exists.
 */

   gcomp.getElementAt = function(x, y) {
      if (y === undefined) {
         y = gcomp._getY(x);
         x = gcomp._getX(x);
      }
      let n = elements.length;
      for (let i = n - 1; i >= 0; i--) {
         if (elements[i].contains(x, y)) return elements[i];
      }
      return null;
   };

   gcomp.toString = function() {
     let str = "";
     for (let i = 0; i < elements.length; i++) {
        if (i > 0) str += ", ";
        str += elements[i];
     }
     return "GCompound(" + str + ")";
   };

   gcomp._sendForward = function(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 0 && k < elements.length - 1) {
         elements.splice(k, 1);
         elements.splice(k + 1, 0, gobj);
      }
   };

   gcomp._sendBackward = function(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 1) {
         elements.splice(k, 1);
         elements.splice(k - 1, 0, gobj);
      }
   };

   gcomp._sendToFront = function(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 0) {
         elements.splice(k, 1);
         elements.push(gobj);
      }
   };

   gcomp._sendToBack = function(gobj) {
      let k = elements.indexOf(gobj);
      if (k >= 0) {
         elements.splice(k, 1);
         elements.unshift(gobj);
      }
   };

   gcomp._getBounds = function(ctm) {
      let bb = GRectangle();
      if (elements) {
         let n = elements.length;
         for (let i = 0; i < n; i++) {
            let obj = elements[i];
            let t = GTransform(ctm);
            t.translate(obj.getX(), obj.getY());
            t.concatenate(obj._getTransform());
            let r = obj._getBounds(t);
            if (i === 0) {
               bb = r;
            } else {
               bb.add(r);
            }
         }
      }
      return bb;
   };

   gcomp._contains = function(x, y) {
      let n = elements.length;
      for (let i = 0; i < n; i++) {
         if (elements[i].contains(x, y)) return true;
      }
      return false;
   };

   gcomp._paintTransformed = function(ctx) {
      let n = elements.length;
      for (let i = 0; i < n; i++) {
         elements[i]._paint(ctx);
      }
   };

   return gcomp;

}

/*
 * Class: GImage
 * -------------
 * This class implements a graphical object that contains an image.
 */

/*
 * Factory method: GImage
 * Usage: let image = GImage(src);
 *        let image = GImage(src, x, y);
 * -------------------------------------
 * Creates a GImage object containing the image specified by src, which may
 * be the name of a local file, a data URL, or a two-dimensional array of
 * pixels.  The parameters x and y specify the origin of the image; if
 * these are omitted, the image is positioned at (0, 0).
 *
 * For each of these forms, the GImage object is assembled asynchronously.
 * Although it can immediately be added to a GWindow or GCompound, none of
 * the methods that return size information or the contents of the pixel
 * array will function correctly until the image is complete.  To ensure
 * that it is, you should add a listener for the "load" event.
 */

function GImage(src, x, y) {

   const DATA_HEADER = "data:image/png;base64,";

   gimage = GObject();
   if (x !== undefined) gimage.setLocation(x, y);
   image = new Image();
   gimage._image = image;
   width = 0;
   height = 0;
   loadListeners = [ ];
   sizeDetermined = false;
   if (typeof(src) === "string") {
      image.src = src;
      if (src.indexOf(DATA_HEADER) === 0) {
         let hlen = DATA_HEADER.length;
         let header = window.atob(src.substring(hlen, hlen + 32));
         width = getInt(header, 16);
         height = getInt(header, 20);
         image.alt = "Image-" + image.width + "x" + image.height;
         sizeDetermined = true;
      } else {
         width = 0;
         height = 0;
         image.alt = src;
      }
   } else {
      height = src.length;
      width = src[0].length;
      sizeDetermined = true;
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      let data = ctx.createImageData(width, height);
      let k = 0;
      for (let i = 0; i < height; i++) {
         for (let j = 0; j < width; j++) {
            let pixel = src[i][j];
            data.data[k++] = (pixel >> 16) & 0xFF;
            data.data[k++] = (pixel >> 8) & 0xFF;
            data.data[k++] = pixel & 0xFF;
            data.data[k++] = (pixel >> 24) & 0xFF;
         }
      }
      ctx.putImageData(data, 0, 0);
      image.src = canvas.toDataURL("image/png");
      image.alt = "Image-" + width + "x" + height;
      ctx.drawImage(image, 0, 0);
   }

/*
 * Method: addEventListener
 * Usage: image.addEventListener(type, callback);
 * ----------------------------------------------
 * Adds a listener to this image.  The only supported type is "load",
 * which is triggered when the image is fully loaded.
 */

   gimage.addEventListener = function(type, callback) {
      if (type === "load") {
         if (this._image.complete) {
            callback();
         } else {
            loadListeners.push(callback);
         }
      }
   }

/*
 * Method: setSize
 * Usage: image.setSize(width, height);
 * ------------------------------------
 * Changes the dimensions of the GImage as specified.
 */

   gimage.setSize = function(a1, a2) {
      if (gimage._isTransformed()) {
         throw new Error("setSize called on transformed object");
      }
      if (a2 === undefined) {
         width = gimage._getWidth(a1);
         height = gimage._getHeight(a1);
      } else {
         width = a1;
         height = a2;
      }
   };

/*
 * Method: setBounds
 * Usage: image.setBounds(x, y, width, height);
 * --------------------------------------------
 * Resets the bounds of the GImage as specified.
 */

   gimage.setBounds = function(a1, a2, a3, a4) {
      if (gimage.isTransformed()) {
         throw new Error("setBounds called on transformed object");
      }
      if (a2 === undefined) {
         gimage.setLocation(gimage._getX(a1), gimage._getY(a1));
         width = gimage._getWidth(a1);
         width = gimage._getHeight(a1);
      } else if (a3 === undefined) {
         width = a1;
         height = a2;
      } else {
         gimage.setLocation(a1, a2);
         width = a3;
         height = a4;
      }
   };

/*
 * Method: getPixelArray
 * Usage: let array = image.getPixelArray();
 * -----------------------------------------
 * Returns a two-dimensional array of pixel values from the stored image.
 * Unfortunately, many browsers do not allow JavaScript programs to read
 * the image data from local files.  Images whose pixels need to be read
 * must be loaded using a data URL.
 */

   gimage.getPixelArray = function() {
      if (!this._image.complete) throw new Error("Image is incomplete");
      determineSize();
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(this._image, 0, 0);
      let pixels = ctx.getImageData(0, 0, width, height);
      let data = pixels.data;
      let k = 0;
      let array = [ ];
      for (let i = 0; i < height; i++) {
         let line = [ ];
         for (let j = 0; j < width; j++) {
            line.push(GImage.createRGBPixel(data[k], data[k + 1],
                                            data[k + 2], data[k + 3]));
            k += 4;
         }
         array.push(line);
      }
      return array;
   };

   gimage.toString = function() {
      return "GImage(" + gimage.getX() + ", " + gimage.getY() + ", " +
                         width + ", " + height + ")";
   };

/* Protected methods */

   gimage.getImage = function() {
      return this._image;
   };

   gimage._getBounds = function(ctm) {
      if (!this._image.complete) throw new Error("Image is incomplete");
      determineSize();
      let bb = GRectangle(ctm.transform(0, 0));
      bb.add(ctm.transform(width, 0));
      bb.add(ctm.transform(0, height));
      bb.add(ctm.transform(width, height));
      return bb;
   };

   gimage._contains = function(x, y) {
      determineSize();
      return x >= 0 && x < width && y >= 0 && y < height;
   };

   gimage._paintTransformed = function(ctx) {
      if (this._image.complete) {
         ctx.drawImage(this._image, 0, 0);
      } else if (gimage._getParent()) {
         let observer = gimage.getCanvas();
         let callback = function() {
            if (observer && observer.repaint) observer.repaint();
         }
         loadListeners.push(callback);
      }
   };

   function getInt(bytes, start) {
      var n = bytes.charCodeAt(start);
      n = n << 8 | bytes.charCodeAt(start + 1);
      n = n << 8 | bytes.charCodeAt(start + 2);
      n = n << 8 | bytes.charCodeAt(start + 3);
      return n;
   }

   function determineSize() {
      if (!sizeDetermined) {
         width = image.width;
         height = image.height;
         sizeDetermined = true;
      }
   }

   function checkComplete() {
      if (image.complete) {
         let n = loadListeners.length;
         for (let i = 0; i < n; i++) {
            loadListeners[i]();
         }
      } else {
         setTimeout(checkComplete, GImage.TIMEOUT);
      }
   }

   checkComplete();
   return gimage;

}

GImage.TIMEOUT = 20;

/*
 * Function: getAlpha
 * Usage: let alpha = GImage.getAlpha(pixel);
 * ------------------------------------------
 * Returns the alpha component from an RGB value, which is an integer
 * between 0 and 255.
 */

GImage.getAlpha = function(pixel) {
   return (pixel >> 24) & 0xFF;
};

/*
 * Function: getRed
 * Usage: let red = GImage.getRed(pixel);
 * --------------------------------------
 * Returns the red component from an RGB value, which is an integer
 * between 0 and 255.
 */

GImage.getRed = function(pixel) {
   return (pixel >> 16) & 0xFF;
};

/*
 * Function: getGreen
 * Usage: let green = GImage.getGreen(pixel);
 * ------------------------------------------
 * Returns the green component from an RGB value, which is an integer
 * between 0 and 255.
 */

GImage.getGreen = function(pixel) {
   return (pixel >> 8) & 0xFF;
};

/*
 * Function: getBlue
 * Usage: let blue = GImage.getBlue(pixel);
 * ----------------------------------------
 * Returns the blue component from an RGB value, which is an integer
 * between 0 and 255.
 */

GImage.getBlue = function(pixel) {
   return pixel & 0xFF;
};

/*
 * Function: createRGBPixel
 * Usage: let pixel = GImage.createRGBPixel(red, green, blue);
 *        let pixel = GImage.createRGBPixel(red, green, blue, alpha);
 * ------------------------------------------------------------------
 * Creates a pixel from the color components, each of which is an integer
 * between 0 and 255.  If alpha is missing, it defaults to 255, which
 * indicates an opaque color.
 */

GImage.createRGBPixel = function(red, green, blue, alpha) {
   if (alpha === undefined) alpha = 0xFF;
   return (alpha << 24) | (red << 16) | (green << 8) | blue;
};

/*
 * Class: GPoint
 * -------------
 * This class encapsulates a two-dimensional point object.  The components
 * are exposed as the x and y fields, but the class also exports getter
 * methods to retrieve these values.
 */

/*
 * Factory method: GPoint
 * Usage: let pt = GPoint(x, y);
 * -----------------------------
 * Creates a GPoint object from its components.
 */

function GPoint(a1, a2) {
   let x = 0;
   let y = 0;
   if (a1 !== undefined) {
      if (a2 === undefined) {
         x = a1.x;
         y = a1.y;
      } else {
         x = a1;
         y = a2;
      }
   }

/*
 * Method: getX
 * Usage: let x = pt.getX();
 * -------------------------
 * Returns the x component of a GPoint.
 */

   function getX() {
      return this.x;
   }

/*
 * Method: getY
 * Usage: let y = pt.getX();
 * -------------------------
 * Returns the y component of a GPoint.
 */

   function getY() {
      return this.y;
   }

/*
 * Method: setLocation
 * Usage: pt.setLocation(x, y);
 * ----------------------------
 * Resets the x and y components of the GPoint.
 */

   function setLocation(a1, a2) {
      if (a2 === undefined) {
         this.x = a1.x;
         this.y = a1.y;
      } else {
         this.x = a1;
         this.y = a2;
      }
   }

/*
 * Method: getLocation
 * Usage: let newpt = pt.getLocation();
 * ------------------------------------
 * Returns a copy of an existing point.
 */

   function getLocation() {
      return GPoint(this.x, this.y);
   }

/*
 * Method: translate
 * Usage: pt.translate(dx, dy);
 * ----------------------------
 * Adjusts the components of the point by the displacements dx and dy.
 */

   function translate(dx, dy) {
      this.x += dx;
      this.y += dy;
   }

   function toString() {
      return "GPoint(" + this.x + ", " + this.y + ")";
   }

   return {
      x: x,
      y: y,
      getX: getX,
      getY: getY,
      setLocation: setLocation,
      getLocation: getLocation,
      translate: translate,
      toString: toString
   };
}

/*
 * Class: GDimension
 * -----------------
 * This class encapsulates a size.  The components are exposed as the
 * width and height fields, but the class also exports getter methods
 * to retrieve these values.
 */

/*
 * Factory method: GDimension
 * Usage: let size = GDimension(width, height);
 * --------------------------------------------
 * Creates a GDimension object from its components.
 */

function GDimension(a1, a2) {
   let width = 0;
   let height = 0;
   if (a1 !== undefined) {
      if (a2 === undefined) {
         width = a1.width;
         height = a1.height;
      } else {
         width = a1;
         height = a2;
      }
   }

/*
 * Method: getWidth
 * Usage: let width = size.getWidth();
 * -----------------------------------
 * Returns the width component of a GDimension.
 */

   function getWidth() {
      return this.width;
   }

/*
 * Method: getHeight
 * Usage: let height = size.getHeight();
 * -------------------------------------
 * Returns the height component of a GDimension.
 */

   function getHeight() {
      return this.height;
   }

/*
 * Method: setSize
 * Usage: size.setSize(width, height);
 * -----------------------------------
 * Resets the width and height components of the GDimension.
 */

   function setSize(a1, a2) {
      if (a2 === undefined) {
         this.width = a1.width;
         this.height = a1.height;
      } else {
         this.width = a1;
         this.height = a2;
      }
   }

/*
 * Method: getSize
 * Usage: let newSize = size.getSize();
 * ------------------------------------
 * Returns a copy of an existing GDimension.
 */

   function getSize() {
      return GDimension(this.width, this.height);
   }

   function toString() {
      return "GDimension(" + this.width + ", " + this.height + ")";
   }

   return {
      width: width,
      height: height,
      getWidth: getWidth,
      getHeight: getHeight,
      setSize: setSize,
      getSize: getSize,
      toString: toString
   };
}

/*
 * Class: GRectangle
 * -----------------
 * This class encapsulates a bounding rectangle.  The components are
 * exposed as the x, y, width, and height fields, but the class also
 * exports getter methods to retrieve these values.
 */

/*
 * Factory method: GRectangle
 * Usage: let rect = GPoint(x, y, width, height);
 * ----------------------------------------------
 * Creates a GRectangle object from its components.
 */

function GRectangle(a1, a2, a3, a4) {
   let x = 0;
   let y = 0;
   let width = 0;
   let height = 0;
   if (a1 !== undefined) {
      if (a2 === undefined) {
         x = a1.x;
         y = a1.y;
         if (a1.width !== undefined) {
            width = a1.width;
            height = a1.height;
         }
      } else {
         x = a1;
         y = a2;
         width = a3;
         height = a4;
      }
   }

/*
 * Method: getX
 * Usage: let x = rect.getX();
 * ---------------------------
 * Returns the x component of a GRectangle.
 */

   function getX() {
      return this.x;
   }

/*
 * Method: getY
 * Usage: let y = rect.getY();
 * ---------------------------
 * Returns the y component of a GRectangle.
 */

   function getY() {
      return this.y;
   }

/*
 * Method: getWidth
 * Usage: let width = rect.getWidth();
 * -----------------------------------
 * Returns the width component of a GRectangle.
 */

   function getWidth() {
      return this.width;
   }

/*
 * Method: getHeight
 * Usage: let height = rect.getHeight();
 * -------------------------------------
 * Returns the height component of a GRectangle.
 */

   function getHeight() {
      return this.height;
   }

/*
 * Method: setLocation
 * Usage: rect.setLocation(x, y);
 * ------------------------------
 * Resets the x and y components of the GRectangle.
 */

   function setLocation(a1, a2) {
      if (a2 === undefined) {
         this.x = a1.x;
         this.y = a1.y;
      } else {
         this.x = a1;
         this.y = a2;
      }
   }

/*
 * Method: getLocation
 * Usage: let pt = rect.getLocation();
 * -----------------------------------
 * Returns the origin of this rectangle as a GPoint.
 */

   function getLocation() {
      return GPoint(this.x, this.y);
   }

/*
 * Method: setSize
 * Usage: rect.setSize(width, height);
 * -----------------------------------
 * Resets the width and height components of the GRectangle.
 */

   function setSize(a1, a2) {
      if (a2 === undefined) {
         this.width = a1.width;
         this.height = a1.height;
      } else {
         this.width = a1;
         this.height = a2;
      }
   }

/*
 * Method: getSize
 * Usage: let size = rect.getSize();
 * ---------------------------------
 * Returns the size of this rectangle as a GDimension.
 */

   function getSize() {
      return GDimension(this.width, this.height);
   }

/*
 * Method: setBounds
 * Usage: rect.setBounds(x, y, width, height);
 * -------------------------------------------
 * Resets the components of the GRectangle.
 */

   function setBounds(a1, a2, a3, a4) {
      if (a2 === undefined) {
         this.x = a1.x;
         this.y = a1.y;
         this.width = a1.width;
         this.height = a1.height;
      } else if (a3 === undefined) {
         this.x = a1.x;
         this.y = a1.y;
         this.width = a2.width;
         this.height = a2.height;
      } else if (a4 === undefined) {
         if (typeof(a1) === "object") {
            this.x = a1.x;
            this.y = a1.y;
            this.width = a2;
            this.height = a3;
         } else {
            this.x = a1;
            this.y = a2;
            this.width = a3.width;
            this.height = a3.height;
         }
      } else {
         this.x = a1;
         this.y = a2;
         this.width = a3;
         this.height = a4;
      }
   }

/*
 * Method: contains
 * Usage: if (rect.contains(x, y)) . . .
 * -------------------------------------
 * Returns true is the GRect contains the point (x, y).
 */

   function contains(x, y) {
      return this.x <= x && x < this.x + this.width &&
             this.y <= y && y < this.y + this.height;
   }

/*
 * Method: add
 * Usage: rect.add(x, y)
 * ---------------------
 * Adds the point (x, y) to the rectangle.
 */

// Extend this to support adding a rectangle

   function add(a1, a2) {
      if (a2 === undefined) {
         this.add(a1.x, a1.y);
         if (a1.width !== undefined) {
            this.add(a1.x + a1.width, a1.y + a1.height);
         }
      } else {
         if (a1 < this.x) {
            this.width += this.x - a1;
            this.x = a1;
         } else if (a1 > this.x + this.width) {
            this.width = a1 - this.x;
         }
         if (a2 < this.y) {
            this.height += this.y - a2;
            this.y = a2;
         } else if (a2 > this.y + this.height) {
            this.height = a2 - this.y;
         }
      }
   }

/*
 * Method: translate
 * Usage: rect.translate(dx, dy);
 * ------------------------------
 * Adjusts the origin of the GRectangle by the displacements dx and dy.
 */

   function translate(dx, dy) {
      this.x += dx;
      this.y += dy;
   }

   function toString() {
      return "GRectangle(" + this.x + ", " + this.y + ", " +
                             this.width + ", " + this.height + ")";
   }

   return {
      x: x,
      y: y,
      width: width,
      height: height,
      getX: getX,
      getY: getY,
      getWidth: getWidth,
      getHeight: getHeight,
      setLocation: setLocation,
      getLocation: getLocation,
      getSize: getSize,
      setSize: setSize,
      setBounds: setBounds,
      contains: contains,
      add: add,
      translate: translate,
      toString: toString
   };

}

/*
 * Class: GMath
 * ------------
 * This class defines several convenience functions for working with
 * graphics.
 */

let GMath = function() {
   throw new Error("GMath cannot be constructed");
};

/*
 * Function: round
 * Usage: let n = GMath.round(x);
 * ------------------------------
 * Rounds the number to the nearest integer.  This function is provided
 * for compatibility with the Java version of GMath.
 */

GMath.round = function(x) {
   return Math.round(x);
};


/*
 * Function: sinDegrees
 * Usage: let sin = GMath.sinDegrees(angle);
 * -----------------------------------------
 * Returns the trigonometric sine of its argument where <code>angle</code>
 * is expressed in degrees.
 */

GMath.sinDegrees = function(angle) {
   return Math.sin(GMath.toRadians(angle));
};

/*
 * Function: cosDegrees
 * Usage: let cos = GMath.cosDegrees(angle);
 * -----------------------------------------
 * Returns the trigonometric cosine of its argument where <code>angle</code>
 * is expressed in degrees.
 */

GMath.cosDegrees = function(angle) {
   return Math.cos(GMath.toRadians(angle));
};

/*
 * Function: tanDegrees
 * Usage: let tan = GMath.tanDegrees(angle);
 * -----------------------------------------
 * Returns the trigonometric tangent of its argument where <code>angle</code>
 * is expressed in degrees.
 */

GMath.tanDegrees = function(angle) {
   return GMath.sinDegrees(angle) / GMath.cosDegrees(angle);
};

/*
 * Function: toDegrees
 * Usage: let degrees = GMath.toDegrees(radians);
 * ----------------------------------------------
 * Converts an angle expressed in radians to its equivalent in degrees.
 */

GMath.toDegrees = function(radians) {
   return radians * 180 / Math.PI;
};

/*
 * Function: toRadians
 * Usage: let radians = GMath.toRadians(degrees);
 * ----------------------------------------------
 * Converts an angle expressed in degrees to its equivalent in radians.
 */

GMath.toRadians = function(degrees) {
   return degrees * Math.PI / 180;
};

/*
 * Function: distance
 * Usage: let r = GMath.distance(x, y);
 *        let r = GMath.distance(x0, y0, x1, y1);
 * ----------------------------------------------
 * Returns the distance from the origin to the point (x, y) in the first
 * form or the distance between the points (x0, y0) and (x1, y1).
 */

GMath.distance = function(x0, y0, x1, y1) {
   if (x1 === undefined) {
      return Math.sqrt(x0 * x0 + y0 * y0);
   } else {
      return GMath.distance(x1 - x0, y1 - y0);
   }
};

/*
 * Function: angle
 * Usage: let theta = GMath.angle(x, y);
 * -------------------------------------
 * Returns the angle in degrees from the origin to the point (x, y).
 * This method is easier to use than Math.atan2 because it specifies
 * the displacements in the usual x/y order and because it takes care
 * of the fact that the JavaScript coordinate system is flipped.
 */

GMath.angle = function(x0, y0, x1, y1) {
   let x = x0;
   let y = y0;
   if (x1 !== undefined) {
      x = x1 - x0;
      y = y1 - y0;
   }
   if (x === 0 && y === 0) return 0;
   return GMath.toDegrees(Math.atan2(-y, x));
};
