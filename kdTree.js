class KDNode {
  constructor(point) {
    this.point = point;
    this.left = null;
    this.right = null;
  }
}


class KDTree {
  constructor(points) {
    this.root = this.buildTree(points, 0);
  }

  buildTree(points, depth) {
    if (points.length === 0) {
      return null;
    }

    const axis = depth % 2;

    points.sort((a, b) => a.pos(axis) - b.pos(axis));

    const medianIndex = Math.floor(points.length / 2);
    const median = points[medianIndex];

    const node = new KDNode(median);

    node.left = this.buildTree(points.slice(0, medianIndex), depth + 1);
    node.right = this.buildTree(points.slice(medianIndex + 1), depth + 1);

    return node;
  }

  search(point, radius) {
    const neighbors = [];
    this.searchHelper(point, this.root, 0, radius, neighbors);
    return neighbors;
  }

  searchHelper(point, node, depth, radius, neighbors) {
    if (node === null) {
      return;
    }

    const distance = point.position.dist(node.point.position);

    if (distance <= radius) {
      neighbors.push(node.point);
    }

    const axis = depth % 2;
    const diff = point.pos(axis) - node.point.pos(axis);

    if (diff <= radius) {
      this.searchHelper(point, node.left, depth + 1, radius, neighbors);
    }

    if (diff >= -radius) {
      this.searchHelper(point, node.right, depth + 1, radius, neighbors);
    }
  }
}
