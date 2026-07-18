# Flora Archive website

This is a standalone website: it does not need a complicated setup or a coding account to open it.

## Open it in Visual Studio Code

1. Open **Visual Studio Code**.
2. Select **File → Open Folder**.
3. Choose this folder: `C:\Users\Admin\Documents\Codex\2026-07-18\g`
4. Open `index.html` and you will see the main page structure.

## See the website in your browser

The easiest method is the free **Live Server** extension:

1. In the left sidebar in VS Code, select the Extensions icon (the four squares).
2. Search for **Live Server** by Ritwick Dey and install it.
3. Open `index.html`.
4. Click **Go Live** at the bottom-right of VS Code.

Your browser will open the site. Changes you save will refresh in the browser automatically.

## What to edit

- **Website name:** in `index.html`, replace every instance of `FLORA ARCHIVE` and update the page title near the top.
- **Words, projects, observations, and links:** edit the text in `index.html`.
- **Colours, fonts, spacing, and layout:** edit `styles.css`. The main colour choices are collected at the very top.
- **Interactive behavior:** edit `script.js`.
- **Photos:** the current photos are online Unsplash placeholders. Replace an image link such as `src="https://images.unsplash.com/..."` with the path to one of your own images. A tidy option is to put your photos in a new `images` folder, then use `src="images/my-photo.jpg"`.

## When you want a change

You can return here and say something like: “Change the homepage photo to this one,” “add a page for my latest project,” or “make the species archive searchable.” Share your photo or the new details and I can update the files.

## Before publishing

To make it public, you will eventually need a domain name and a hosting service. The files in this folder are yours to upload to a host such as Netlify, Vercel, or GitHub Pages.
