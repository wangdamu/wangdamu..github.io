function Chromosome(n){
	this.chromosome = [];
	if(n){
		for(var i = 0; i < n; i++){
			var rv = Math.random();
			if(rv < 0.5){
				this.chromosome.push(0);
			}else{
				this.chromosome.push(1);
			}
		}
	}
}

Chromosome.prototype.mutate = function(mutateRate){
	
	var rv = Math.random();
	if(rv < mutateRate){
		var index = Math.random() * this.chromosome.length;
		this.chromosome[index] = 1 - this.chromosome[index];	
	}
	
	/*
	for(var i = 0; i < this.chromosome.length; i++){
		var rv = Math.random();
		if(rv < mutateRate){
			this.chromosome[i] = 1 - this.chromosome[i];	
		}
	}
	*/
}

Chromosome.prototype.crossOver = function(secondParent){
	var crossPoint = Math.random() * this.chromosome.length;
	var endCrossPoint = (crossPoint + this.chromosome.length / 2) % this.chromosome.length;
	var direction = endCrossPoint - crossPoint;

	var ret = new Chromosome();
	var chromosome = [];
	for(var i = 0; i < this.chromosome.length; i++){
		if((i - crossPoint) * direction >= 0 && (endCrossPoint - i) * direction > 0){
			chromosome.push(secondParent.chromosome[i]);
		}else{
			chromosome.push(this.chromosome[i]);
		}
	}
	ret.chromosome = chromosome;
	return ret;
}

Chromosome.prototype.calFitness = function(realCalFunction){
	if(!this.fitness){
		this.fitness = realCalFunction(this.chromosome);
	}
	return this.fitness;
}


function Population(size, geneticNum){
	this.individuals = [];
	if(size){
		for(var i = 0; i < size; i++){
			var individual = new Chromosome(geneticNum);
			this.individuals.push(individual);
		}
	}
}

Population.prototype.init = function(maxGeneration, crossProtectCount, mutateProtectCount, mutateRate){
	this.maxGeneration = maxGeneration;
	this.crossProtectCount = crossProtectCount;
	this.mutateProtectCount = mutateProtectCount;
	this.mutateRate = mutateRate;
}

Population.prototype.calFitnesses = function(realCalFunction){
	if(!this.totalFitness){
		this.totalFitness = 0;
		for(var i = 0; i < this.individuals.length; i++){
			this.individuals[i].calFitness(realCalFunction);
			this.totalFitness += this.individuals[i].fitness;
		}
	}
	return this.totalFitness;
}

Population.prototype.evolution = function(realCalFunction){
	this.generation = this.generation? this.generation:1;
	if(this.generation > this.maxGeneration){
		return;
	}
	this.calFitnesses(realCalFunction);
	this.individuals.sort(function(a, b){
		if(a.calFitness(realCalFunction) > b.calFitness(realCalFunction)){
			return -1;
		}
		if(a.calFitness(realCalFunction) < b.calFitness(realCalFunction)){
			return 1;
		}
		return 0;
	});

	var newPopulation = new Population();
	newPopulation.init(this.maxGeneration, this.crossProtectCount, this.mutateProtectCount, this.mutateRate);
	newPopulation.generation = this.generation + 1;

	var newIndividuals = [];
	for(var i = 0; i < this.individuals.length; i++){
		var individual = this.selectParent(realCalFunction); //this.individuals[i];
		var newIndividual = individual;
		if(i >= this.crossProtectCount){
			newIndividual = individual.crossOver(this.selectParent(realCalFunction));
		}
		if(i >= this.mutateProtectCount){
			newIndividual.mutate(this.mutateRate);
		}
		newIndividuals.push(newIndividual);
	}
	newPopulation.individuals = newIndividuals;
	newPopulation.displayTotalFitness(realCalFunction);
	newPopulation.evolution(realCalFunction);
}

Population.prototype.displayTotalFitness = function(realCalFunction){
	console.log("generation: " + this.generation + ", totalFitness: " + this.calFitnesses(realCalFunction));
}

Population.prototype.selectParent = function(realCalFunction){
	var totalProb = 0;
	for(var i = 0; i < this.individuals.length; i++){
		var individual = this.individuals[i];
		totalProb += individual.calFitness(realCalFunction);
	}

	var randValue = totalProb * Math.random();
	var prob = 0;
	for(var i = 0; i < this.individuals.length; i++){
		var individual = this.individuals[i];
		prob += individual.calFitness(realCalFunction);
		if(randValue < prob){
			return individual;
		}
	}
	return null;
}