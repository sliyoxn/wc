/**
 * 大顶堆
 */
class MaxHeap {
	constructor() {
		this.heap = []
	}

	size() {
		return this.heap.length
	}

	empty() {
		return this.size() === 0
	}

	add(item) {
		this.heap.push(item);
		this._shiftUp(this.size() - 1)
	}

	removeMax() {
		this._shiftDown(0)
	}

	static getParentIndex(k) {
		return parseInt((k - 1) / 2 + "")
	}

	static getLeftIndex(k) {
		return k * 2 + 1
	}

	static getRightIndex(k) {
		return k * 2 + 2;
	}

	_shiftUp(k) {
		// 如果当前节点比父节点大，就交换
		while (this.heap[k] > this.heap[MaxHeap.getParentIndex(k)]) {
			this._swap(k, MaxHeap.getParentIndex(k));
			// 将索引变成父节点
			k = MaxHeap.getParentIndex(k)
		}
	}

	_shiftDown(k) {
		// 交换首位并删除末尾
		this._swap(k, this.size() - 1);
		this.heap.splice(this.size() - 1, 1);
		// 判断节点是否有左孩子，因为二叉堆的特性，有右必有左
		while (MaxHeap.getLeftIndex(k) < this.size()) {
			let j = MaxHeap.getLeftIndex(k);
			// 判断是否有右孩子，并且右孩子是否大于左孩子
			if (j + 1 < this.size() && this.heap[j + 1] > this.heap[j]) j++;
			// 判断父节点是否已经比子节点都大
			if (this.heap[k] >= this.heap[j]) break;
			this._swap(k, j);
			k = j
		}
	}

	_swap(left, right) {
		let rightValue = this.heap[right];
		this.heap[right] = this.heap[left];
		this.heap[left] = rightValue
	}
}

let heap = new MaxHeap();
heap.add(46);
heap.add(79);
heap.add(56);
heap.add(38);
heap.add(40);
heap.add(84);
console.log(heap.heap);
