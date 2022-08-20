# tagmanager
- Keyword Selection Manager - [DEMO](http://studio42.wz.cz/tagmanager/)
- JS script fetching data by AJAX call and generating keywords to the page with the option to choose.
- Just create an instance of the class and run the startup() method.

```
window.onload = function () {
    let tagManager = new TagManager(
        "./tags.json",
        5,
        "tagview",
        "tagfield",
        "tagfieldid",
        "span",
        "span"
    );
    tagManager.startup();
}
```
- constructor:
```
    /**
     * 
     * @param {string} url data path
     * @param {int} maxNumber maximum number of tags that can be selected
     * @param {string} tagView ID of the element to which the tags for selection will be generated
     * @param {string} tagField ID of the element in which the selected tags will be displayed
     * @param {string} tagFieldId ID of the element in its 'value' attribute will be generated ID tag in the format of individual values separated by a comma, e.g. "1,3,7"
     * @param {string} tagViewElement html element with which the tags in the tagview will be wrapped
     * @param {string} tagFieldElement html element with which the tags in the tagfield will be wrapped
     */
    constructor(url, maxNumber, tagView, tagField, tagFieldId, tagViewElement, tagFieldElement) 
```
