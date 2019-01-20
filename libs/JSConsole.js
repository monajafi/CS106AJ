/*
 * File: JSConsole.js
 * ------------------
 * This file implements a replacement for the JavaScript system console
 * that installs itself in an element named JSConsole.
 *
 * The typical usage pattern for this file is to include a script tag
 * that reads in this file at the head section of the index.html file,
 * as follows:
 *
 *    <script src="JSConsole.js" type="text/javascript"></script>
 *
 * Given the order in which scripts are loaded, this file always creates
 * a new console object. On the first reference to the new console object,
 * the implementation checks to see whether an element exists with the
 * specified tag.  If no such element exists, the implementation creates
 * a new <div> element at the end of the <body> element with the missing
 * tag.  By default, the <div> used for the console takes up the entire
 * browser window, but this assumption can be changed by setting the
 * style explicitly using CSS.
 */

/*
 * Factory method: JSConsole
 * Usage: let console = JSConsole();
 *        let console = JSConsole(id);
 *        let console = JSConsole(width, height);
 *        let console = JSConsole(id, width, height);
 * --------------------------------------------------
 * Creates a new JSConsole object and installs it in the element specified
 * by id.  If id is missing, it defaults to "JSConsole"; if width and height
 * are missing, the size of the console defaults to the entire enclosing
 * window, although this value may be changed using CSS.
 */

function JSConsole(a1, a2, a3) {
   let id = "JSConsole";
   let input = "";
   let width = -1;
   let height = -1;
   let start = -1;
   let margin = 25;
   let element = null;
   let div = null;
   let callback = null;
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

/*
 * Method: write
 * Usage: console.write(str);
 * --------------------------
 * Appends the HTML string to the end of the element.
 */

   function write(str) {
      initCheck();
      if (div) {
         div.innerHTML += str;
      } else {
         if (document.systemConsole.error) {
            document.systemConsole.error("Console has not been installed");
         } else {
            document.systemConsole.log("Console has not been installed");
         }
      }
   }

/*
 * Method: log
 * Usage: console.log(str);
 * ------------------------
 * Prints the argument to the console, followed by a newline.
 */

   function log(str) {
      initCheck();
      if (div) {
         div.innerHTML += quoteHTML("" + str) + "<br>";
      } else {
         document.systemConsole.log(str);
      }
   }

/*
 * Method: println
 * Usage: console.println(str);
 * ----------------------------
 * Prints the argument to the console, followed by a newline.
 */

   function println(str) {
      initCheck();
      if (div) {
         div.innerHTML += quoteHTML("" + str) + "<br>";
      } else {
         if (document.systemConsole.error) {
            document.systemConsole.error("Console has not been installed");
         } else {
            document.systemConsole.log("Console has not been installed");
         }
      }
   }

/*
 * Method: print
 * Usage: console.print(str);
 * --------------------------
 * Prints the argument to the console with no terminating newline.
 */

   function print(str) {
      initCheck();
      if (div) {
         div.innerHTML += quoteHTML("" + str);
      } else {
         if (document.systemConsole.error) {
            document.systemConsole.error("Console has not been installed");
         } else {
            document.systemConsole.log("Console has not been installed");
         }
      }
   }

/*
 * Method: clear
 * Usage: console.clear();
 * -----------------------
 * Clears the console.
 */

   function clear() {
      initCheck();
      if (div) {
         div.innerHTML = "";
      } else {
         if (document.systemConsole.clear) {
            document.systemConsole.clear();
         } else {
            if (document.systemConsole.error) {
               document.systemConsole.error("Console has not been installed");
            } else {
               document.systemConsole.log("Console has not been installed");
            }
         }
      }
   }

/*
 * Method: requestInput
 * Usage: console.requestInput(prompt, fn);
 * ----------------------------------------
 * Requests input from the console.  If a prompt string is specified, that
 * string is printed on the console before requesting input.  When the user
 * types a newline character, the input is passed to the supplied callback
 * function fn.  For applications that need to accommodate multi-line input,
 * the callback function can return the string "continue", which is treated
 * as a signal that the console should continue to wait for additional
 * input.
 */

   function requestInput(prompt, fn) {
      initCheck();
      if (fn === undefined) {
         callback = prompt;
      } else {
         print(prompt);
         callback = fn;
      }
      start = div.innerHTML.length;
      moveCursorToEnd();
      input = "";
      div.focus();
   }

/* Private functions */

   function quoteHTML(str) {
      let result = "";
      for (let i = 0; i < str.length; i++) {
         let ch = str.charAt(i);
         switch (ch) {
          case ' ': ch = "&nbsp;"; break;
          case '<': ch = "&lt;"; break;
          case '>': ch = "&gt;"; break;
          case '&': ch = "&amp;"; break;
          case '\n':
            if (i === 0 || str.charAt(i - 1) !== '\r') {
               ch = "<br>";
            }
            break;
          case '\r':
            if (i === 0 || str.charAt(i - 1) !== '\n') {
               ch = "<br>";
            }
            break;
         }
         result += ch;
      }
      return result;
   }

   function keydown(e) {
      let ch = String.fromCharCode(e.which || e.keyCode);
      if (ch === '\177' || ch === '\b') keypress(e);
   }

   function keypress(e) {
      if (!e.metaKey && e.preventDefault) e.preventDefault();
      scrollToEnd();
      let ch = String.fromCharCode(e.which || e.keyCode);
      if (ch === '\n' || ch === '\r') {
         div.innerHTML += "<br>";
         callback(input);
      } else {
         if (ch === '\177' || ch === '\b') {
            if (input.length > 0) {
               input = input.substring(0, input.length - 1);
            }
         } else {
            input += ch;
         }
         div.innerHTML = div.innerHTML.substring(0, start) +
            "<font color=blue>" + quoteHTML(input) + "</font>";
      }
      moveCursorToEnd();
      div.focus();
   }

   function scrollToEnd() {
      if (div.scrollHeight > div.scrollTop + div.clientHeight - margin) {
         div.scrollTop = div.scrollHeight - div.clientHeight + margin;
      }
   }

   function moveCursorToEnd() {
      let node = div.lastChild;
      while (node !== null && !(node instanceof Text)) {
         node = node.lastChild;
      }
      if (node === null) return;
      let range = document.createRange();
      let selection = window.getSelection();
      range.selectNode(node);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
   }

   function initCheck() {
      if (!element && document.body) {
         element = document.getElementById(id);
         if (!element) element = document.getElementsByTagName("body")[0];
         div = document.createElement("div");
         div.align = "left";
         div.style.overflowY = "auto";
         div.style.overflowX = "auto";
         div.style.background = "white";
         div.style.fontFamily = "'Courier New',Courier,Monospaced";
         div.style.fontSize = "1em";
         div.style.fontWeight = "bold";
         if (width === -1) {
            div.style.width = "100%";
         } else {
            div.style.width = width + "px";
         }
         if (height === -1) {
            div.style.height = "100%";
            div.style.minHeight = "100%";
         } else {
            div.style.height = height + "px";
         }
         div.contentEditable = true;
         div.addEventListener("keydown", keydown, false);
         div.addEventListener("keypress", keypress, false);
         element.appendChild(div);
      }
   }

   let console = {
      clear: clear,
      log: log,
      print: print,
      println: println,
      requestInput: requestInput,
      write: write
   };

   initCheck();

   return console;
}

document.systemConsole = console;
console = JSConsole();
