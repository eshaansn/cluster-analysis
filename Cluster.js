class Cluster {
  constructor(n, k) {
    this.n = n;
    this.k = k;
    this.Points = [];
    this.Starter = [];
    this.Centroids = []
    this.dataConstant = 4
  }

  Initialize() {
    for (let i = 0; i < this.k; i++) {
      this.Starter[i] = new SpotStarter(random(width), random(height));
    }
  }

  Simulate() {
    for (let i = 0; i < this.n; i++) {
      this.Points[i] = new Spot(0, 0);
    }

    let dataClusters = round(random(2, this.dataConstant));
    console.log(dataClusters);
    let Centers = [];
    let distance = 20 * random(4, 7);
    for (let i = 0; i < dataClusters; i++) {
      Centers[i] = [
        round(random(width / 20 - 4) * 20),
        round(random(height / 20 - 4) * 20),
      ];
    }

    for (let i = 0; i < this.n; i++) {
      let rand = round(random(Centers.length - 1));
      let arbCenter = Centers[rand];
      this.Points[i].x = random(arbCenter[0], arbCenter[0] + distance);
      this.Points[i].y = randomGaussian(arbCenter[1], 20 * random(1, 3));
    }
  }

  simulateRandom() {
    for (let i = 0; i < this.n; i++) {
      this.Points[i] = new Spot(random(width), random(height));
    }
  }

  Analyse() {
    this.Points.forEach((pt) => {
    this.Find(pt);
    });
    this.Clusterise()
    this.Centroidise()
  }

  Step(){
      this.Points.forEach(pt => {
          pt.minDist = null
          pt.minDistPoint = []
          pt.distance = []
      });
      this.Starter = this.Centroids
      this.Analyse()
  }

  Find(pt) {
    for (let i = 0; i < this.Starter.length; i++) {
      pt.distance.push(dist(pt.x, pt.y, this.Starter[i].x, this.Starter[i].y));
    }
    pt.distance.sort((a, b) => a - b);
    pt.minDist = pt.distance[0];

    for (let i = 0; i < this.Starter.length; i++) {
      if (dist(pt.x, pt.y, this.Starter[i].x, this.Starter[i].y) === pt.minDist) {
        pt.minDistPoint = [this.Starter[i].x, this.Starter[i].y];
      }
    }
  }

  Clusterise() {
    for (let i = 0; i < this.Starter.length; i++) {
      this.Points.forEach((pt) => {
        if (
          pt.minDistPoint[0] == this.Starter[i].x &&
          pt.minDistPoint[1] == this.Starter[i].y
        ) {
          this.Starter[i].myPoints.push(pt);
        }
      });
    }
  }

  Centroidise() {
      let centroids = []
      this.Starter.forEach(elt => {
          let ptx = []
          let pty = []
          for (let i = 0; i < elt.myPoints.length; i++) {
              ptx.push(elt.myPoints[i].x);
              pty.push(elt.myPoints[i].y);
          }
          if(elt.myPoints.length !== 0){
            let x = ptx.reduce((acc, val) => acc + val)
            x/=elt.myPoints.length
            let y = pty.reduce((acc, val) => acc + val)
            y/=elt.myPoints.length
            centroids.push([x,y])
          } else {
              centroids.push([elt.x, elt.y])
          }
      });
      
      for (let i = 0; i < centroids.length; i++) {
          let elt = centroids[i]
          this.Centroids[i] = new SpotStarter(elt[0], elt[1])
      }
  }

  drawCentroidLines(pt) {
    line(pt.x, pt.y, pt.minDistPoint[0], pt.minDistPoint[1]);
  }

  Show() {
    background(0)
    this.Points.forEach((pt) => {
      stroke(220);
      strokeWeight(5);
      point(pt.x, pt.y);
      stroke(255, 204, 0, 100);
      strokeWeight(1);
      this.drawCentroidLines(pt);
    });

    this.Starter.forEach((pt) => {
      stroke("purple");
      strokeWeight(5);
      point(pt.x, pt.y);
    });

    // this.Centroids.forEach((pt) => {
    //   stroke("green");
    //   strokeWeight(5);
    //   point(pt.x, pt.y);
    // });

  }
}
