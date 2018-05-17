const app = {
    init(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    renderListItem(flick) {
        const item = document.createElement('li')
        item.dataset.id = flick.id
        item.textContent = flick.name
        return item
    },

    //does the same thing as the ev => above
    //.addEventListener('submit', this.handleSubmit.bind(this))

    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }

        //add to the beginning of the array
        this.flicks.unshift(flick)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)
        // this.list.appendChild(item)

        f.reset()
    },
}

app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
})