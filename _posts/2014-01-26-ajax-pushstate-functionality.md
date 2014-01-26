---
layout: post
categories: blog updates
---

I'm experimenting with HTML5's [history API][1] and [Ajax][2] to add some really cool, but subtle effects to my website.

When a relative link is clicked on my site, instead of the default functionality of loading a new page, an Ajax call fetches data from the server and modifies the current page's DOM to reflect the new page requested from the server.

To give the user an indication of activity, I am using [NProgress][3] to show a loading bar while the Ajax request is taking place.

Then, when the Ajax call finishes, the main element in the page fades out, gets modified, and fades back in.

The code still needs some cleaning up and optimization, but the effects are still pretty cool.

One main setback is if the fetched data from the server prompts loading Javascript. According to the HTML5 standards, scripts inserted via `innerHTML` will not execute, so I used JqueryJQuery's `.html()` method to load scripts loaded from the server. The problem is, when a "heavy" script is loaded, the UI freezes. 

[1]: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history
[2]: https://developer.mozilla.org/en-US/docs/AJAX
[3]: http://ricostacruz.com/nprogress/
[4]: http://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0