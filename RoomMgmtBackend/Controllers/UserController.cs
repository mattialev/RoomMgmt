using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Formatter;

using Repositories;
using Models;

namespace Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ODataController
{
    private readonly UserRepository _userRepository;

    public UserController(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [EnableQuery]
    [HttpGet]
    public async Task<IEnumerable<User>> Get()
    {
        var users = await _userRepository.GetAll();
        return users;
    }

    [EnableQuery]
    [HttpGet("{userId}")]
    public async Task<ActionResult<User>> Find(Guid userId)
    {
        var user = await _userRepository.Find(userId);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [EnableQuery]
    [HttpPost]
    public async Task<ActionResult<User>> Post([FromBody] User user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _userRepository.Insert(user);

        return Created(user);
    }

    [HttpPut("{userId}")]
    public async Task<ActionResult<User>> Put(Guid userId, [FromBody] User user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (userId != user.UserID)
        {
            return BadRequest();
        }

        await _userRepository.Update(user);

        return Ok();
    }

    [HttpDelete("{userId}")]
    public async Task<ActionResult<User>> Delete(Guid userId)
    {
        await _userRepository.Delete(userId);
        return Ok();
    }
}
