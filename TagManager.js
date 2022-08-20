class TagManager {
    
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
    constructor(url, maxNumber, tagView, tagField, tagFieldId, tagViewElement, tagFieldElement) {
        this.url = url;
        this.maxNumber = maxNumber;      
        this.tagView = document.getElementById(tagView);
        this.tagField = document.getElementById(tagField);
        this.tagFieldId = document.getElementById(tagFieldId)
        this.tagViewElement = tagViewElement;
        this.tagFieldElement = tagFieldElement;
        this.tagFieldIdArr = [];
    }

    /**
     * starting data fetching and generating html elements
     */
    startup() {

        // callback after clicking on the tag in tagfield
        const tagFieldClick = (tag) => {
            this.tagField.removeChild(tag);
            for (let node of this.tagView.children) {
                if (node.getAttribute('data-tagview-id') == tag.getAttribute('data-tagfield-id')) {
                    node.setAttribute('class', '');
                }
            }
            this.tagFieldIdArr = this.tagFieldId.getAttribute('value').split(',');
            this.tagFieldIdArr = this.tagFieldIdArr.filter(id => id !== tag.getAttribute('data-tagfield-id'))
            this.tagFieldId.setAttribute('value', this.tagFieldIdArr.join(','));
        }

        // callback after clicking on the tag in tagview
        const tagViewClick = (tag) => {
            let tagFieldElement = document.createElement(this.tagFieldElement);
            tagFieldElement.setAttribute('data-tagfield-id', tag.getAttribute('data-tagview-id'));
            tagFieldElement.innerText = tag.innerText;
            
            tagFieldElement.addEventListener('click', function () {
                tagFieldClick(this);
            });            

            // if the tag is inactive and we don't have more than 5 tags selected, we mark it with the .tag-active class, add it to the #tagFieId and insert its ID (key) into the value attribute of the #tagFieldId
            if (tag.getAttribute('class') !== 'tag-active' && this.tagField.children.length < this.maxNumber) { // 
                tag.setAttribute('class', 'tag-active');
                this.tagField.appendChild(tagFieldElement);
                if (this.tagFieldId.getAttribute('value') == '')                                
                    this.tagFieldId.setAttribute('value', this.tagFieldId.getAttribute('value') + tag.getAttribute('data-tagview-id'));
                else
                    this.tagFieldId.setAttribute('value', this.tagFieldId.getAttribute('value') + ',' + tag.getAttribute('data-tagview-id'));
            }
            // otherwise, we disable the tag and remove it from #tagField and its id from tagFieldId value attribute
            else {
                tag.setAttribute('class', '');
                for (let node of this.tagField.children) {
                    if (node.getAttribute('data-tagfield-id') == tag.getAttribute('data-tagview-id')) {
                        this.tagField.removeChild(node);
                    }
                }
                this.tagFieldIdArr = this.tagFieldId.getAttribute('value').split(',');
                this.tagFieldIdArr = this.tagFieldIdArr.filter(id => id !== tag.getAttribute('data-tagview-id'))
                this.tagFieldId.setAttribute('value', this.tagFieldIdArr.join(','));
            }
        };

        this._getData(data => {    
                for (const key in data) {
                    let divView = document.createElement(this.tagViewElement);    // noHTML element reprezentujici jeden tag
                    divView.setAttribute('data-tagview-id', key);
                    divView.innerText = '#' + data[key];
                    
                    
                    divView.addEventListener('click', function () { // nastaveni na tag udalost kliknuti ktera oznaci tag a prida ho do tagFiled
                        tagViewClick(this);
                    });  

                    this.tagView.appendChild(divView);              
                }
        });
    }
   
    /** 
     * AJAX call to get data 
     */
    _getData(callback) {
        fetch(this.url)
        .then((response) => response.json())
        .then(callback);
    }
}

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




