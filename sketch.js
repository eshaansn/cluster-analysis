let cluster;
function setup() {
  createCanvas(600, 400);
  cluster = new Cluster(100, 3);
  cluster.Simulate();
  // cluster.simulateRandom();
  cluster.Initialize();
  cluster.Analyse()
  cluster.Show()
}

function mousePressed() {
  background(0);
  cluster.Step()
  cluster.Show();
}

