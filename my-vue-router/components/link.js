export default {
    name: 'RouterLink',
    props: {
        to: {
            type: String,
            required: true
        }
    },
    // template: `<a :href=""{{'#' + this.to}}><slot name="default"></slot></a>`
    render(h) {
        return h('a', {
            attrs: {
                href: '#' + this.to
            },
            on: {
                click: this.clickHandler
            }
        }, [this.$slot.default])
    }
}