using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ship_management.Models
{
    [Table("ships")]
    public class Ship
    {
        [Required, Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public double length { get; set; }

        [Required]
        public double width { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z]{4}-[0-9]{4}-[a-zA-Z]{1}[0-9]{1}$", ErrorMessage = "The field {0} is not a valid ship code")]
        public string code { get; set; }
    }
}
