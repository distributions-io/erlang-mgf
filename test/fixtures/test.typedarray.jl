using Distributions
using JSON

k = 2
lambda = 1.5
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

outfile = open("./test/fixtures/typedarray.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
