export default function render() {
    async function home(req, res, next) {
        res.render("home")
    }

    async function allexpenses(req, res, next) {
        res.render("allexpenses")
    }

    return {
      home,
      allexpenses,
    };
}