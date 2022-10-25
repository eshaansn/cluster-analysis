let cluster;
let step;
let reset;

function setup() {
  createCanvas(600, 400);
  resetFunction()

  step = createButton('Step')
  step.mousePressed(stepFunction)

  reset = createButton('Reset')
  reset.mousePressed(resetFunction)
}

function stepFunction() {
  background(0);
  cluster.Step()
  cluster.Show();
}

function resetFunction(){
  cluster = new Cluster(100, 3);
  cluster.Simulate();
  cluster.Initialize();
  cluster.Analyse()
  cluster.Show()
}

