---
layout: post
categories: blog
---

I migrated my blog to [Jekyll][1] yesterday. It was pretty easy since I didn't have that many posts.

Jekyll makes managing my site incredibly easy by compiling text files into a directory containing a static website, and is way more convenient than using a conventional content management system.

My personal website/blog setup so far:
I keep my site content on my VPS, and run this command within a screen session:

{% highlight bash %}
jekyll build --source /home/desmond/deslee-jekyll --destination /path/to/http/root --watch
{% endhighlight %}

The `--watch` option tells Jekyll to watch for changes in any of my source files, and regenerate the destination files automatically.

Next, I [sshfs][2] my Jekyll source directory onto my home computer and open up the files in my text editor. When I save the files, the Jekyll process will generate the corresponding HTML files, and changes will appear on my site almost immediately.

Finally, I use Git with my Jekyll directory for revision control.

This makes it much easier than logging into a cms backend, using a web based editor, and submitting my content to the server to be stored on a database.

[1]: http://jekyllrb.com/
[2]: http://fuse.sourceforge.net/sshfs.html