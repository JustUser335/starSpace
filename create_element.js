export default class CreateEl {
    constructor(nameNode,parentNodeName)
    {
        this.nameNode       = nameNode;
        this.parentNodeName = parentNodeName;
    }

    create()
    {
        const el = document.createElement(`${this.nameNode}`);
        const parent = document.querySelector(`${this.parentNodeName}`)
        parent.appendChild(el);
        return el;
    }
}
