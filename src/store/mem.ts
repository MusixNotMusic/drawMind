export default class Memory {
    private memStack: any[] = [];
    constructor(panel: any) {
        panel.$eventemit.on('draw-finish', this.push, this)
    }

    push (mem: any) {
        console.log('draw-finish', mem)
        this.memStack.push(mem)
    }

    find (target: any) {
        console.log('find ==>', target)
        return this.memStack.find((item: any) => { return item.target.contains(target)})
    }

    remove (target: any) {
        let index = this.memStack.findIndex((item: any) => { return item.target.contains(target) })
        if (index >= 0) {
            this.memStack.splice(index, 1)
        }
    }

}