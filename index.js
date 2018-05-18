const app = {
    init(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name
        item.querySelector('.alert').addEventListener('click', ev => {
            ev.preventDefault()
            this.delete(ev)
        })
        item.querySelector('.warning').addEventListener('click', ev => {
            ev.preventDefault()
            this.favbutton(ev)
        })
        
        return item
    },

    //does the same thing as the ev => above
    //.addEventListener('submit', this.handleSubmit.bind(this))
    delete(ev){
        const t = ev.target.closest('.flick')
        t.remove()
        
    },
    favbutton(ev){
        const f = ev.target.closest('.flick')
        f.style.background = 'red'
    },

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
    templateSelector: '.flick.template',
})