using Distributions
using JSON

k = 10
lambda = 14
d = Erlang( k, 1/lambda )

x = linspace( .5, -100, 200 )

dmgf(t) = mgf(d, t )
y = map( dmgf, x )
println( y )

data = Dict([
	("k", k),
	("lambda", lambda),
	("data", x),
	("expected", y)
])

outfile = open("./test/fixtures/deepset.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
