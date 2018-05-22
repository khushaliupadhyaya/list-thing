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
        item.querySelector('.flickName').textContent = flick.name
        //const nameSpan = item
            //.querySelector('.flickName')
            item
                .querySelector('.flickName').addEventListener('keypress', ev => {
                ev.preventDefault()
                this.saveOnEnter(item, flick, ev)
            })
            // .textContent = flick.name
            // nameSpan.textContent = flick.name
        //nameSpan.addEventListener('keypress', this.saveOnEnter.bind(this))

        item.querySelector('.alert').addEventListener('click', ev => {
            ev.preventDefault()
            this.delete(item, flick, ev)
        })

        item.querySelector('.warning').addEventListener('click', ev => {
            ev.preventDefault()
            this.favbutton(item, flick, ev)
        })

        // item.querySelector('.edit').addEventListener('click', this.toggleEditable.bind( this, flick))
        item.querySelector('.edit').addEventListener('click', ev => {
            //this.toggleEditable.bind( this, flick)
            ev.preventDefault()
            this.toggleEditable(this, flick, ev)



            //this might be causing problems!!

        })

        item.querySelector('.moveUp').addEventListener('click', ev => {
            ev.preventDefault()
            this.upButton(this, flick, item)
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

    toggleEditable(item, flick, ev){
        const nameField = ev.target.closest('.flick').querySelector('.flickName')
        const btn = ev.target.closest('.flick').querySelector('.edit.button')
        //const btn = ev.target
        //debugger
        if (nameField.isContentEditable) {
            //make it no longer editable
            nameField.contentEditable = false
            //nameField.contentEditable = !nameField.isContentEditable
            //update the button
            btn.textContent = 'edit'
            btn.classList.remove('success')

            //save changes
            flick.name = nameField.textContent
        } else {
            //make it editable
            //nameField.contentEditable = !nameField.isContentEditable
            nameField.contentEditable = true
            nameField.focus()

            //update the button
            btn.textContent = 'save'
            btn.classList.add('success')
        }
    }

    saveOnEnter(item, flick, ev) {
        if(ev.key === 'Enter') {
            this.toggleEditable(item, flick, ev)
        }
    }

    upButton(item, flick, ev) {
        //move the button upwards
        //move it up in the array as well
    }

    downButton(item, flick, ev) {
        //move the button downwards
        //move it down in the array as well
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