class App {
    constructor(selectors) {
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
    }

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name
        item.querySelector('.alert').addEventListener('click', ev => {
            ev.preventDefault()
            this.delete(item, flick, ev)
        })
        item.querySelector('.warning').addEventListener('click', ev => {
            ev.preventDefault()
            this.favbutton(item, flick, ev)
        })
        
        return item
    }

    //does the same thing as the ev => above
    //.addEventListener('submit', this.handleSubmit.bind(this))
    delete(item, flick, ev){
        const t = ev.target.closest('.flick')
        //remove from the DOM
        t.remove()

        //remove from the array
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)        
    }
    favbutton(item, flick, ev){
        const f = ev.target.closest('.flick')
        //f.style.background = 'yellow'
        flick.fav = item.classList.toggle('fav')
    }

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
    }
}

const app = new App({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})